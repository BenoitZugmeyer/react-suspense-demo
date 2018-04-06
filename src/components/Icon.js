import React from "react";

const ROOT_URL = "https://staticv2-4.rottentomatoes.com/static/images";

function position(position) {
  return {
    background: `transparent url(${ROOT_URL}/redesign/icons-v2.png) no-repeat`,
    backgroundPosition: position
  };
}

function url(url) {
  return {
    background: `transparent url(${ROOT_URL}/icons/${url}) no-repeat`,
    backgroundSize: "cover"
  };
}

const ICONS = {
  tiny: {
    size: 16,
    styles: {
      certified: url("CF_16x16.png"),
      fresh: url("fresh-16.png"),
      upright: url("popcorn-16.png"),
      rotten: url("splat-16.png"),
      spilled: url("badpopcorn-16.png"),
      wts: url("wts-16.png")
    }
  },
  big: {
    size: 48,
    styles: {
      certified: position("-192px -96px"),
      fresh: position("-192px -48px"),
      upright: position("-240px -48px"),
      rotten: position("-240px -96px"),
      spilled: position("-192px 0"),
      wts: position("-240px 0")
    }
  },
  medium: {
    size: 32,
    styles: {
      certified: url("CF-32.png"),
      fresh: position("-64px -128px"),
      upright: position("-32px -128px"),
      rotten: position("-96px -128px"),
      spilled: position("-128px -128px"),
      wts: position("0px -128px")
    }
  },
  small: {
    size: 24,
    styles: {
      certified: url("CF-24.png"),
      fresh: position("-288px -48px"),
      upright: position("-288px -24px"),
      rotten: position("-288px -96px"),
      spilled: position("-288px -120px"),
      wts: position("-288px 0px")
    }
  }
};

export default function Icon({ type, size = "small" }) {
  if (!ICONS.hasOwnProperty(size)) {
    throw new Error(`Invalid icon size "${size}"`);
  }
  type = type.toLowerCase().replace(/[^a-z]+/g, "");
  if (type === "certifiedfresh") type = "certified";
  if (type === "popcorn") type = "upright";
  if (type === "anticipated") type = "wts";
  const { styles, size: sizePx } = ICONS[size];
  if (!styles.hasOwnProperty(type)) {
    throw new Error(`Invalid icon type "${type}"`);
  }
  return (
    <div
      style={Object.assign(
        {
          width: sizePx,
          height: sizePx,
          display: "inline-block",
          verticalAlign: "middle"
        },
        styles[type]
      )}
    />
  );
}
