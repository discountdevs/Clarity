var Mapvar = function () {
  // Defines the map's textures with base64
  this.textures = {
    wall: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADNJREFUOE9j9PT0/M9AAWAEGcDDw0OWEV++fGEYNWA0DIZLOvD19f3PwcExwHmBLOuhmgCrKEex0FtLIQAAAABJRU5ErkJgggAA",
    elevator: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAG5JREFUOE9jbPJX/W+jwsdADjhy5xMD4+A2AOREEMDlRbxegGmGhQ02Q3AagK4ZlyFYDYBpfvD6C4OCKA9YLzIb2SVYDVhy/BlYU4ylFANyGCCLw1xEMBopCkSQLcPAAGwBh5xnCAYioQw2OAwAAKSneWF2TERPAAAAAElFTkSuQmCC",
    bouncer: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAL1JREFUWEdjnOSx6D/DAALGQeeAQO0ImobH+qsrUMzHCIEBcwCtLUYPVlhIwENg1AFDJgTQUzF63BLrEbLTwIA5gJDFpIYEySEwYA4g1WJiQ4LoEBh1wGgIDHgITDvRC07YkrzSJLUTnn9+ClafZVGMVR/RuWDAHQBzPrEOIeRzmHlEh8CgcQC6Q3AlCFxxTrUWESwqBswBJGUFPIpJTgPUspjsRDj8HQDzIbFtOnJDZPD2jMj1EaX6Brx3DACes9+BlKvVwAAAAABJRU5ErkJgggAA",
    unlock: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAIZJREFUOE9jrK+v/8/JyclADvj+/TsDY0dHx39yNMP0DDIDnh5thftG2rqaKJ/BvQDSHOfEDde0aN9XBmIMARuArBmkEWYQiI0PgCxAMQBmK7prsBkCU0uUC0AugrkGmQ13AcgGXGEAC1iQYpga5PBBSQeEYgGb/CBLSESlHDRFlHuB0uwMAFC6cUuZ0N/DAAAAAElFTkSuQmCC",
    water: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAANBJREFUWEftVrEWQDAM1MnGD9n8mtlg95FsJqYYSuQO1fJ07TW9XC9pXNU2cxZw5WVxGN19noAlbnAFYALyVtMwHp5BcdbFsr8qgAZGcTQBOWC51lIIvXijQDIE2Ayu4tOpAjYT1owa/rQC0QmgphWcVj2nFUiGAOsdH39ZgZ9AMAXYMkOJ+HFVDzxGoO673Znw7l/PV0gSdNEJhB5KLW+8pw+gpkRx6kSkSYYGRnE0AfTzYauH9sDdQytNwHI1ux+fgDQi9u2sTFEzrp0wFoEF5tyeUaMzMqsAAAAASUVORK5CYIIA",
    goal: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAK9JREFUWEdjbI6R/c8wgIBx0DmgpoydpuHR0vUTxXyMEBgwB9DaYvRghYUEPASGnAPUL78Be8p6AQeYntfLQ1LaoTgE6O4AmIXo3qRbCNDdAf9+vwV7VvMG/oKSZiEw4A7AlaTRo4JmITBoHYDusKTiLwNTDsAcMuqA0RAYDYHREBiwEIBZjF4yEtsyorhFNOAOIKkBiEUxxSFAdQfADKR183zw9owoDVJy9Q947xgAE4XdgWlb6HsAAAAASUVORK5CYIIA",
    lava: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAb9JREFUWEfNlz1OxDAQhWNptQ0H2JZqRQMNRwAajsDeggZuQMctOAI0cARooKOi3SugSF4Rz3OULxpZkVCcFOs4drxv3rz5SYgXTWz+rk332zR7Gy9t1PBmN7fbdPP4nUabt9c/3XT1oXOOhwdoP44NywEgZLL8zCwF4my5GNP6brjfZQRM9AxUByDfCsgm+TRfe/MpfJ/XP00T1AoZ1NzO6RlYDACzvD0fQs/q9iwiQ9zHKLP1MQNLA7B6QTyXtCHL6dIn08ipbTCtFBmYD4CHnBmMlnnq95hyo6AagAerBQKgOKaKnRqQM6O3v5BXQqwO4H2dqqHiGD5qrDa09+tuJYtSPtZ70oLHpBiENkJcDAD68PV3+OQqMaAMqcyY58wXjA5H5D0D1QA8b5MGqNaj9KA9IbLhnDVixIjTCemUEKsDUE/oJSISMLVYSUtOfhl3REy1swNQT/iFf1YVQ6+o3k+7c55QFOgc9Iy9BuiC2QEoEQnSHeJfgEo1ghnUc6WbCasBmBoFXn+gjke+Zj8gA1FzpkfBvwNgImLfX+ps6PtSPhl9GVUHcGMdkXxX6gFLvuX7/MoWQ5YfQqwM4ADxGE162R2WywAAAABJRU5ErkJgggAA",
    saltwater: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABOFJREFUWEeNV01PHFcQ7F4MKzNrJUQsx7XhT/kOl/BPcssfMDdI5Bu/COQcTcQe2EUClH1RV1f36wFhvELs7Mz76NddVV2jJxdnTaQJPk3tH36pirSmYndEeQ/DFH8xxZ75td2PdURWN/9iyV8OF7KlKq2J6EZFtmytiUjbYLweX3yJbXwQ1/JALABfFEFhLxXNTRmzzWo+GsE2kTUD2Dv6KLqxhVU2TWVic224rWSXx+cWQElA7qaijUFgfdvAU2MbZJwZKCeW7NiwCIRbvPjSk4svsZ6fgGnIm5ziuUAemBXPDUrlBfCpGaxHEqV4NYDj8zNkYGe2iwWe1vd+JluJh2pRW1GZDrtY+GF175sSEnbhAVkJfHNfgdjAQIbK06FoyEBTBGBjn1ZrBx+B1wHmR5x+GEQ2Ig/rewcRNo7NIhX8DgQxq3mOkg4G0Gv129FCWpskzJGIhj0R1PLqH0wfDvZxP0CLQ6nhJhJnWSSTSlacRJ4bxGUgtB+J2sMFq9wXiFVt8dtrD2A238cxrTwJ4lEQzcvD1HtcMTJ2Fy9B5fHqu/P3tc+AjXkKrOe089M7Cl+AMYHaJYfpET05P3OyEVGrm5ufCKALVKaSBAqdSqECUDkeO401S0/OnYY+JAjVZciP+0wpVWQ6DGLC9nS35swuWnE6n+uRvdsdRCcij+t1lgWPnYbBcA/Py1YUsFDJQ2yyDdaoPN05G7pCUBGzzI7UnWEXmTCWVWYhA13cmQWit9O4ZyaaQAjM3qeFHxK1D/G270mXbG1yS/YAvNlnrBeYFCddHFQc8QwLISh+OwL49fCjs52p9qelnOgbKsvrbyP2xD7MAPcsTYVwcXQjnVRHAJmgFZXV9x+DNk4xO9gnW6oOIAOOgfwUqsZJxs2nJkblLdZkAPM5LkPWHdcmxRSiZEJy2+TYkRRNx1coAWTnc+BGm8wGRdp7W+HgmM+DlgyUPlqz4CV02Q1whh8IbwIY9zzCL0SscBtR0I4N3LP5kQGfwFOjO77Hb+N5NDIIClUjeQEKdqFxkobw+oY1g9vopgo9yBK4Unm+SAnw3O6Ct8GNFH2mNJsMw6/Pg5ZVIZvK9vBeNhOR/6AfInp6+Xc/k4rAPYnIMpvOnDbL880+lsLT/WRgo4+Ap6hupdA3vCICGKPTO1y03dnBnH7wGRgtZ2Mv1elfdCHKE2UM1kA/jNqf//yj4johbrztiC8ARfZ7bfEzXGUxMdnzYVqIr+IfI5DXA5jv024xjQmmonLVWo36SRVTChnpHa4s2j67YT9htOWw1/FkZzYgO7BsrG23bd2qo0kRvM6ahHC3boEN48/xxVnrnc/1nsF219tUprZws3Z67y4oRIaEgBHVhq5n4Hs0lNceQZMb9j7cktY3o3Qy1WZTwbL7HS2ynUJwNiqwkPwsr9h0DEMEaggh6dZblTHupSEpzClvYWtatT10v6KsIakm2boly6trhDJQ+6t2W2b8kNSc6AXdsrtqPFe+fG7d7w3LFl0v9H/sEaiSFD7Yf5QgG4QbzExZUqwz9a03nW5aO11j/c5Wui4D4e+XX+H6IbnZhEI/O53Cb3hwHBjeoL79sMlMZ4O/aRlrikGJN6doWHp6+ReO97gydBO4nDB6Ey5alG/NjKq38qitNTOnLZpOmj72nDxAk/8BxWkkNI6CRLAAAAAASUVORK5CYII=",
    antibounce: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAALFJREFUWEftl0EOhTAIRPUaPWFP3mt8E5O64Ie8QWPFWLcN8DoMqGut9bc8+KxpAEopQ3Vore31DgUmQDoFeo+6MaKAFI8eoATkWIoPA6hK2MJeXH6ATh69kW2N5x1UIA0AgXhmpKmRFUgDoILQzW2e8LvAM6U6phPgtAIkvTr/7wP47iZUb257r8bhJlQTDQNQN5y3MW18WIHhAPTJdfUcFbhagOInwJ8CJNld54//HW99A/sBTxqtNwAAAABJRU5ErkJgggAA",
    speedzone: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAALNJREFUWEftl0sKwCAMBeNle4PSHqHgEXsYS5FsBHlN/CRCXXRTIePkGTAcGyUiomt/v/PWGXOtYA6Q7mzAaoUfYFkDnGKUHXS71BlwD4BOzuaGGRgGgNR/Law24BZAevLuBoYD1NRrC4sNuAWYNglR+msgqEXqQcQFW1uzLkDrycW3oOyxOwAUtlpI1RkoDUwD6FVYnQE3AFrlZRbEGWADZgBo9kv/iw1IC6D99o9T69fxAyaci01twl6CAAAAAElFTkSuQmCC",
    air: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADJJREFUOE9jrK+v/8/JyclADvj+/TsDY0dHx39yNMP0jBrAMBqIDKNhAMoPlOcFSrMzAD6dL0uPtm9RAAAAAElFTkSuQmCC",
    tar: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAQBJREFUOE+NU10LgkAQ9BQCKRQii6AIol4K+gvS//8LvfUQUgQGIQRqzMKe231o+7LHns7Ozs6p1ezQpuMsQJTvO2UZfMc18xvlAlgvd8H1drHA4jAL4klI9bpuKDsBrD89BQASAA6juBthmiyoQxSFupNrPM3gn5kBini+CsqsjdrP87ZqOvFM0Rj8UwXEUgZqNAKKUjgJ4qPOQBaAqQd/KBvIMwGYawMDs7OPlWbAncAAmnCWgkkz8b06bvJ2aE6XU/UWWESTtmTALJIktRyqRxhS3qULGem0PdMaYZC+R8VG4jfAY/+I6OsizYPREGw+vcZHUZLT4H/52nDuE/kLky2YbjxyP0sAAAAASUVORK5CYIIA",
    sand: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAQ5JREFUOE9jPD4p4r+anBgDCNx69ApMIwOYHEwMXQ0jNgP4+fgZPn76iGHY0zdfGYLNRMHi7/7wgGmsBmDoxCEAMhBsAIjhaKQI94KFEhfYBiGWL3CbsHkP7gJi/AwyFARO3PsGpmFhw7imzve/tAg33Az0QINJ7D93H+xKZAASA3sBJIgccMiG4HI6zCAMA9DDA6YQ2QJkNtgA9GgDuQDdZlyugrsAZhPIBaAwgdHIAYacmGDyjG835P0n5E9sKRUeC7BARHc2sgtgrnj54SdGCoV7gVDIYwsXcEL6vyUJHI2gBIIvU8ESEiwPwLyNEoi4bEFOPCCvgQAs8cGj8dq9Z+CUBkr/yLkNxMYXyAB6KrirkPXw4QAAAABJRU5ErkJgggAA",
    checkpoint: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAIhJREFUOE9jZM9Z/Z+BAsAIM+Cnsi1JxrDfPQxWDzaAVM0wm0CG4DXAufIWg5xHGMN8+wtYXYfTAJBGGCDZAGTNIENINsC4fhbYcoFfDmCaZANgTocZpOc0jfQwQA6xxIMGI9oAkP9hAFtiIpgS/TfpwA3Y6HcFIzXCDQDJkJofUDITSdkQTTEAv7Fy4Z5FYKEAAAAASUVORK5CYII=",
    locked: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAC5JREFUOE9jtHWP/c9AAWAEGcArIEaWEZ8/vGIYNWA0DEbTAQMD9cKArKwI1QQApWdIEfa7468AAAAASUVORK5CYIIA",
    ice: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAJJJREFUOE9j9N7w/z8DBYCREgO2HrvMADfAU4GBQYqHeKcEzboMVoxiAEiAGEN2P2JgmL4DhwGEDAFpBgG8BuAyBKaZKAPQDUHWTLQBMEPQNRNtwMZ7DAwqAthjhmAYgDTDADZD8BqArBmXITgNwKYZmyFYDcCnGd0QDAN+/SM+GYPCBMUAUKYgFzAylF2iKDsDAIHrZTO5HBzfAAAAAElFTkSuQmCC",
    walljump: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAIFJREFUOE9j/LyJ4T8DBYAR2QAeH+JM+rIFoQ6vATCF6AZjNQCbotM3ITaZqjMw4DIEqwtANoA0OxZDDNjfi2kIzBVYDQBpgGmG+RZdDMMAbAFIszAgGAuEwoCgAYTCgKABsIDDFQYgeYKBCPMG0ekAORYGTxjgylo4A5G4vIiqCgAJh3ZR4vXYPAAAAABJRU5ErkJgggAA",
    mossy: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAQtJREFUOE+Fk1ELAUEQx+d06eQoXghJkrxQnn2C+/qeJElCvFCs7tLlNHtmzY3l5mX3bnd+M/OfHScIggTedrzuaKvXZrWT+badOwjwfd9c3Edrs297/QyAzu6hgmFtAkopyAWc3I2GxOoJ5EjUXIDrF7QjmcxodViAM52Nk0FrBDxSJm8AkI50bgCVrpeJxAHkTAGoHFzD8yPNoFQv6vrQUBy05WUO5VIqriyFAhgAlmAz3hE8l6VYReQgCZCQn4B/gmI5jbin41gB6MxbRxpw8QiiASgidoHM5kwR8Q6VhZDbNvp0waqiRTiuy1cbsYW8ffLp8gzMO5DDxC9JgBw0I6JMn48tH2nb/xd0U7XjnLG8hAAAAABJRU5ErkJgggAA",
    moss: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAARRJREFUOE+FU6sOwkAQvAbVkJQm/ABIDBqFRqIxWL4BU0XST0Kj0Bgk/ABJaUKqSMlcmMt0W8qqu33M7s7uRlmW1XEcu0t5dirzZNH4q522qqpclOd5DU84wEDHZDhyk8HMg9zfV1e+ngFQwQPA6XZ0y+nKOxEEjhpcPAqXjlOfiBIAqNBgBcMbgZoIul6AvtL/VtBg8Pth6QCGgJdod9jWJMuWjD/77gL0LWz26xqME1EdEQxi0TfIIw9MBLsHYBAUEOtsJ4M/yfQAnD97/JVRK2iR2LUHtmQG6ZK1xsjy2AZB7KoTJLRgWbYBtHOZmCCQqDPGfJUX5UQ3EiABQEep4+N9EETvALqo65ztKbN8eyc45w/CAMgtolHQZQAAAABJRU5ErkJgggAA",
  };

  this.player_img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAHJJREFUOE9jZMAC5jkx/McmnrSPgRFdHEUAWWOiK6rS+bsRfGSD4AbANKNrRLcRZhDMELABxGqGGYZsCNwAQjZjcwnIFYyk2o7uCrABpNqObMhwMQDkJ1LDARaVlEcjVRISKYZgTcqweKUoMyEnVVKyMwCd9EVLb4USZgAAAABJRU5ErkJgggAA";

  this.tile_size = 16; // Tilesize (in px)

  this.display_order = [
    2, 6, 1, 0, 23, 24, 5, 4, 13, 17, 18, 9, 3, 12, 15, 14, 10, 11, 20, 16, 8
  ]; // Order of the tiles in the bottom bar (editr v2 only)

  this.keys = [
    // Void
    {
      id: 0,
      colour: "#333",
      solid: 0,
      blockname: "Void", // Me, leave an easter egg? I would never.
    },
    // Air
    {
      id: 1,
      colour: "#888",
      solid: 0,
      img: "air",
      blockname: "Air",
    },
    // Platform
    {
      id: 2,
      colour: "#555",
      solid: 1,
      bounce: 0.35,
      img: "wall",
      blockname: "Wall",
    },
    // Water
    {
      id: 3,
      colour: "rgba(121, 220, 242, 0.4)",
      interior_friction: {
        x: 0.9,
        y: 0.9,
      },
      gravity: {
        x: 0,
        y: 0.1,
      },
      jump: 1,
      fore: 1,
      img: "water",
      blockname: "Water",
    },
    // Elevator
    {
      id: 4,
      colour: "#b37859",
      gravity: {
        x: 0,
        y: -0.1,
      },
      jump: 1,
      img: "elevator",
      blockname: "Elevator",
    },
    // Bounce
    {
      id: 5,
      colour: "#E373FA",
      solid: 1,
      bounce: 1.1,
      img: "bouncer",
      blockname: "Bouncer",
    },
    // AntiBounce
    {
      id: 6,
      colour: "#666",
      solid: 1,
      bounce: 0,
      img: "antibounce",
      blockname: "Anti Bouncer",
    },
    // Color Changer Random
    {
      id: 7,
      colour: "#73C6FA",
      solid: 0,
      script: "change_colour",
      blockname: false,
    },
    // Goal
    {
      id: 8,
      colour: "#FADF73",
      solid: 0,
      script: "next_level",
      img: "goal",
      blockname: "Goal",
    },
    // Die
    {
      id: 9,
      colour: "#C93232",
      solid: 0,
      script: "death",
      img: "lava",
      blockname: "Lava",
    },
    // Unlockable Wall
    {
      id: 10,
      colour: "#555",
      solid: 1,
      img: "locked",
      blockname: "Unlockable Wall",
    },
    // Unlock Tile
    {
      id: 11,
      colour: "#0FF",
      solid: 0,
      script: "unlock",
      img: "unlock",
      blockname: "Key",
    },
    // Saltwater
    {
      id: 12,
      colour: "rgba(121, 220, 242, 0.4)",
      interior_friction: {
        x: 0.9,
        y: 0.95,
      },
      gravity: {
        x: 0,
        y: -0.07,
      },
      jump: 1,
      fore: 1,
      img: "saltwater",
      blockname: "Saltwater",
    },
    // Speed Zone
    {
      id: 13,
      colour: "rgb(255, 255, 0)",
      solid: 0,
      fore: 1,
      boost: 1,
      img: "speedzone",
      blockname: "Sanic Zone",
    },
    // Tar
    {
      id: 14,
      colour: "#453a4f",
      interior_friction: {
        x: 0.3,
        y: 0.1,
      },
      gravity: {
        x: 0,
        y: 2,
      },
      jump: 1,
      fore: 1,
      img: "tar",
      blockname: "Tär",
    },
    // Quick Sand
    {
      id: 15,
      colour: "#edb06e",
      interior_friction: {
        x: 0.6,
        y: 0.5,
      },
      gravity: {
        x: 0,
        y: 0.3,
      },
      jump: 1,
      fore: 1,
      img: "sand",
      blockname: "Speedsand",
    },
    // Checkpoint
    {
      id: 16,
      colour: "#C93232",
      solid: 0,
      script: "checkpoint",
      img: "checkpoint",
      blockname: "Checkpoint",
    },
    // Ice
    {
      id: 17,
      colour: "#112233",
      solid: 1,
      fore: 1,
      bounce: 0.35,
      gravity: {
        x: 0,
        y: 0.1,
      },
      friction: {
        x: 1.1,
        y: 0,
      },
      jump: 1,
      img: "ice",
      blockname: "Ice",
    },
    // Wall Jump
    {
      id: 18,
      colour: "#558",
      solid: 1,
      bounce: 0,
      jump: 1,
      img: "walljump",
      blockname: "Wall Jump",
    },
    // Foreground Wall Block
    {
      id: 19,
      colour: "#553",
      solid: 0,
      fore: 1,
      bounce: 0,
      blockname: false,
    },
    // Spawn Block
    {
      id: 20,
      colour: "#551",
      solid: 0,
      fore: 1,
      bounce: 0,
      blockname: false,
    },
    // Secondary Unlockable Wall
    {
      id: 21,
      colour: "#535",
      solid: 1,
      blockname: false,
    },
    // Secondary Unlock Tile
    {
      id: 22,
      colour: "#00F",
      solid: 0,
      script: "unlock2",
      blockname: false,
    },
    // Mossy Wall Block
    {
      id: 23,
      colour: "#355432",
      solid: 1,
      img: "mossy",
      blockname: "Mossy Wall",
    },
    // Overhanging Moss
    {
      id: 24,
      colour: "#355456",
      solid: 0,
      img: "moss",
      blockname: "Overhanging Moss",
    }
  ];

  this.data = [
    [
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 2, 6, 6, 6, 6, 6, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 2, 2, 2, 2, 4, 2, 2, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 2, 4, 2, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 2, 4, 2, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 2, 4, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 2, 4, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 2, 4, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 2, 4, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 2, 4, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 2, 4, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 6, 17, 17, 17, 17, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 24, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 2, 4, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 2, 4, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 2, 4, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 2, 4, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 2, 2, 23, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 2, 4, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 4, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 8, 1, 1, 1, 2, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 6, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2,
      1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2,
      9, 9, 9, 2, 10, 10, 10, 10, 10, 10, 1, 1, 1, 1, 1, 1, 1, 11, 2, 2, 2, 2,
      4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2,
      2, 2, 2, 2, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2,
      2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2,
      2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2,
      2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0,
    ],
    [
      2, 6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
      2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 1,
      1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0,
    ],
    [
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
      2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 1, 1,
      1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
      2, 2, 2, 2, 1, 2, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 6, 6, 6, 2, 2,
      2, 2, 2, 2, 6, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
      2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
      2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 2, 2, 2, 1, 1, 1, 1, 2, 5, 5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 2, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 2, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 2, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 2, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 1, 1,
      1, 1, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
  ];

  this.gravity = {
    x: 0.0,
    y: 0.3,
  };

  /* Velocity limits */

  this.vel_limit = {
    x: 15.8,
    y: 15.8,
  };

  /* Movement speed when the key is pressed */

  this.movement_speed = {
    jump: 6,
    left: 0.3,
    right: 0.3,
  };

  /* The coordinates at which the player spawns and the colour of the player */

  this.player = {
    x: 1,
    y: 1,
    colour: "#FF5B00",
  };

  /* scripts refered to by the "script" var in the tile keys */

  this.scripts = {
    change_colour: function () {
      game.player.colour = "#" + ((Math.random() * 0xffffff) << 0).toString(16);
    },
    /* you could load a new mapvar here */
    next_level: function () {
      game.current_map.player.x = 1;
      game.current_map.player.y = 1;
      game.checkpoint = false;
      game.load_map(window.map);
      game.current_map.keys[10].solid = 1;
      game.current_map.keys[10].img = "locked";
      window.timemillis = performance.now() - window.start_time;
      window.start_time = performance.now();
      exitFullscreen();
    },
    death: function () {
      game.load_map(window.map);
      game.current_map.keys[10].solid = 1;
      game.current_map.keys[10].img = "locked";
    },
    unlock: function () {
      game.current_map.keys[10].solid = 0;
      game.current_map.keys[10].img = "air";
    },
    checkpoint: function () {
      game.current_map.player.x = Math.round(game.player.loc.x / 16);
      game.current_map.player.y = Math.round(game.player.loc.y / 16);
      game.checkpoint = true;
    },

    jump_hook: function () {
      if (game.detectSides(18).result && !game.isGroundSolid()) {
        if (game.allow_special_jump) {
          game.allow_special_jump = false;

          if (game.detectSides(18).side == "left") {
            // Bump player off wall to the right using velocity
            game.player.vel.x += game.current_map.movement_speed.jump;
          } else {
            // Same thing, but to the left
            game.player.vel.x -= game.current_map.movement_speed.jump;
          }
          game.player.vel.y -= game.current_map.movement_speed.jump;
        }
      } else {
        if (
          game.isInside(3) ||
          game.isInside(12) ||
          game.isInside(14) ||
          game.isInside(15)
        ) {
          if (game.allow_special_jump) {
            game.allow_special_jump = false;

            game.player.vel.y -= game.current_map.movement_speed.jump;
          }
        } else {
          game.player.vel.y -= game.current_map.movement_speed.jump;
        }
      }

      game.player.can_jump = false;
    },

    update_hook: function () {
      if (game.detectSides(18).result) {
        if (game.detectSides(18).side == "left" && game.key.left) {
          game.player.vel.y *= 0.8;
        } else if (game.detectSides(18).side == "right" && game.key.right) {
          game.player.vel.y *= 0.8;
        }
      }
    },
  };

  this.background = "#222";

  this.version = 2;
};
