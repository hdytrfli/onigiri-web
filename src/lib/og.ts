import { readFile } from "node:fs/promises";
import path from "node:path";
import satori from "satori";
import sharp from "sharp";

const root = process.cwd();
const font = (pkg: string, file: string) => path.join(root, "node_modules", pkg, "files", file);

const INK = "#1b1b1b";
const MUTED = "#5c5c5c";
const FAINT = "#8a8a86";
const WASH = "#f7f7f4";

type Node = { type: string; props: Record<string, unknown> };

const h = (type: string, props: Record<string, unknown> = {}, children?: unknown): Node => ({
  type,
  props: { ...props, children },
});

let fontsPromise: Promise<Parameters<typeof satori>[1]["fonts"]> | undefined;

function getFonts() {
  fontsPromise ??= Promise.all([
    readFile(font("@fontsource-variable/geist", "geist-latin-wght-normal.woff2")),
    readFile(font("@fontsource/caprasimo", "caprasimo-latin-400-normal.woff2")),
  ]).then(([geist, caprasimo]) => [
    { name: "Geist", data: geist, weight: 400 as const, style: "normal" as const },
    { name: "Caprasimo", data: caprasimo, weight: 400 as const, style: "normal" as const },
  ]);

  return fontsPromise;
}

let mascotPromise: Promise<string> | undefined;

function getMascot() {
  mascotPromise ??= (async () => {
    const png = await sharp(path.join(root, "mascot", "excited.png"))
      .resize({ width: 760 })
      .png()
      .toBuffer();
    return `data:image/png;base64,${png.toString("base64")}`;
  })();

  return mascotPromise;
}

const chips = ["GPL-3.0", "Android 9+", "No telemetry"];

export async function renderOg() {
  const [mascot, fonts] = await Promise.all([getMascot(), getFonts()]);

  const card = h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        color: INK,
        fontFamily: "Geist",
      },
    },
    [
      h(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: 780,
            height: "100%",
            paddingLeft: 84,
            paddingRight: 40,
            paddingBottom: 24,
          },
        },
        [
          h(
            "div",
            {
              style: {
                display: "flex",
                fontSize: 18,
                letterSpacing: "0.18em",
                color: FAINT,
              },
            },
            "OPEN SOURCE JELLYFIN CLIENT",
          ),
          h(
            "div",
            {
              style: {
                display: "flex",
                fontFamily: "Caprasimo",
                fontSize: 146,
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                marginTop: 22,
              },
            },
            "Onigiri",
          ),
          h(
            "div",
            {
              style: {
                display: "flex",
                fontSize: 28,
                lineHeight: 1.45,
                color: MUTED,
                marginTop: 26,
                maxWidth: 560,
              },
            },
            "Movies, shows, books, and music from your own server.",
          ),
          h(
            "div",
            {
              style: {
                display: "flex",
                marginTop: 36,
              },
            },
            chips.map((label, index) =>
              h(
                "div",
                {
                  style: {
                    display: "flex",
                    borderRadius: 999,
                    backgroundColor: WASH,
                    padding: "10px 18px",
                    fontSize: 18,
                    marginRight: index < chips.length - 1 ? 10 : 0,
                  },
                },
                label,
              ),
            ),
          ),
        ],
      ),

      h("img", {
        src: mascot,
        width: 400,
        height: 400,
        style: {
          position: "absolute",
          right: 58,
          top: 112,
          width: 400,
          height: 400,
          objectFit: "contain",
        },
      }),

      h(
        "div",
        {
          style: {
            position: "absolute",
            left: 84,
            bottom: 36,
            display: "flex",
            fontSize: 18,
            color: FAINT,
          },
        },
        "github.com/hdytrfli/onigiri-client",
      ),
    ],
  );

  const svg = await satori(card as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts,
    pointScaleFactor: 2,
  });

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Uint8Array(png);
}
