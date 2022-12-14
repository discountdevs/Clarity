# Clarity
Clarity (v2): The Modern, Moddable Platformer! (WIP)

Ok, Ok. I know what you're thinking. You're thinking, "What happened to the old Clarity?", which is a fair question. I'll answer that quickly: After a game engine rework, Clarity (Legacy) is now an archived project and will not recieve any further updates. 
Clarity legacy can be found at: 
https://github.com/discountdevs/Clarity-Legacy

## What is Clarity?

Clarity is a platformer game engine for the future. It allows for the simple creation of 2d platformer games using simple, high-level javascript in a format called a "mapvar".

## Okay, but what *is* a mapvar?

A mapvar is a self-contained game. It contains textures, scripts, physics definitions, and much, much more. Mapvars can be published on the Workshop, and can then be played and reviewed by the community. The mapvar docs can be found [here](https://github.com/discountdevs/ClarityEngine/blob/main/docs/mapvar.md).

## What happened to the workshop?

The old (now obsolete) workshop was unsecure and unstable. It has been rewritten, and it now contains none of the original levels. Old levels will be ported over soon, and a utility will also be provided for you to convert your legacy maps to proper v2 mapvars.

## What about the development workflow?

If you wanna develop Clarity, fork the repo and clone it locally. Open it up in your favorite editor, and then open a terminal. If you're on windows, a tool is provided to spin up a server (requires `python3` to be installed):

```bat
ezhost
```

Or, if you're on Linux or MacOS, where `python3` should be preinstalled:

```
python3 -m http.server
```

Make the changes you want to make, then push to your fork. Open a PR and provide a description of what you changed, and it will be reviewed and merged.

### This page is still under construction.

However, it is almost in a stable state that is ready for release. If you want to try it out, check the URL:
> https://discountdevs.github.io/Clarity/
> Join the discord: https://discord.gg/FbEJ2DyGME
