# PLAF109: Polar Wet Food Feeder

## Supported Features

### On-Device Web Dashboard

This device has an optional custom UI that is enabled by default. It replaces the stock ESPHome web UI at `http://<device-ip>/` and is built into the firmware, so it works without internet access. Source code is in [`ui/`](ui/) (originally [sylphrena0/petlibro-esphome-plaf109-ui](https://github.com/sylphrena0/petlibro-esphome-plaf109-ui)).

![Remote on a phone: feeding cards, chamber and configuration settings, and missed meal and battery warnings](ui/docs/screenshots.png)

Note that screenshot uses mocked data (this feeder doesn't seem to get that cold).

### Functions

- reset button
  - restarts esphome when held for more than 2s
- automatic cooling to target temperature
  - option to manually disable cooling
  - automatically disables when power is lost to preserve power
  - targets below 53°F are rejected (stock firmware cools to 12°C / 53.6°F)
  - "Cooling Target Not Reached" problem sensor turns on if cooling runs 6 hours without reaching the target
  - NOTE: unsure about the utility of setting a target temperature
- feed now
  - plays chime
  - opens door, if not already open
  - waits for pet to arrive, up to a configurable timeout
    - 0 turns the timeout off: the door stays open for the feeding time from when the meal is served, whether or not the pet comes, then the plate rotates
    - max 24 hours, but a timeout past the next scheduled meal will skip that meal if the pet doesn't come
      - timeouts on the scale of hours risk spoiled food, use your judgement
    - optionally repeats chime at a configurable interval
      - optionally stops repeating after a configurable timeout, keeping the lid open (0 chimes until the pet arrives)
    - closing the lid cancels the meal
  - if pet arrived
    - keeps door open for a configurable minimum feeding time after arrival
    - then waits till pet has been gone for 10s
    - closes door, if not manually closed
    - rotates plate
  - logs if pet arrived or not
  - closes door, if not already closed
- daily or multi-day feeding schedule, stored on-device, see [Feeding Schedule](#feeding-schedule)
  - feeds front plate, then rotates AFTER meal
  - uses same flow as manual feed, no special handling
  - warns when a meal is missed or cancelled (plate is not rotated in these cases)
    - also warns when a meal is skipped because the previous one is still in progress
    - reason is shown in the dashboard and in a "Missed Meal Reason" sensor
    - warning survives reboots, is cleared when the next schedule cycle starts (midnight, for a daily schedule), by a successful manual feed, or with the clear button
  - next meal sensor
- open/close lid
  - will only close when pet is not present
  - using encoder to ensure lid opens/closes fully
- rotate plate
  - using encoder to ensure alignment
- presence sensor
  - daily visits and time at feeder
  - last visit time and duration
- status led
  - switch turns the white led on or off
  - pulses white while wifi is disconnected
  - pulses red while a missed meal warning is active, alternating red/white if wifi is also disconnected
  - warnings override the switch
- play chime

### Sensors

- battery voltage sensor
  - displays charge percentage, using factory formula
  - reports whether batteries are installed (below 2V is treated as none); percentage is unavailable without batteries
- ac power detection
  - may take several seconds to update after unplugged
- chamber temperature
  - not confident this is accurate, may need more calibration
  - uses factory formula

### Feeding Schedule

Each meal has a time (`Meal One`) and a date (`Meal One Date`). A schedule cycle runs from the earliest meal date through the latest, then repeats starting the day after the last meal's date, like the stock app's "Automatically Repeat Schedule". Meals are always served in date and time order, regardless of meal number.

- all three meals on the same date repeat every day
  - unset dates default to today, so an existing daily schedule keeps working after upgrading
- meals on different dates make a multi-day schedule, for example:
  - `Meal One` and `Meal Three` on the 1st, `Meal Two` on the 2nd: two meals on the 1st, one on the 2nd, then two on the 3rd, one on the 4th, and so on
  - meals on the 1st, 2nd and 3rd: one meal per day, refill every three days
  - skipped dates are rest days, so meals on the 1st and 3rd repeat every three days with no meal on the 2nd
- dates in the future delay the schedule until then
- once a cycle is over, all dates move forward to the next cycle at midnight, so they always show the current or upcoming cycle
- `Next Meal` shows when the next scheduled meal is served, and is empty while the schedule is off

Load the front section with the first meal of the cycle, then the other sections in the order they rotate to the front. Unlike the stock app, the schedule doesn't need to be repositioned after a refill, since the feeder always serves the section at the front.

### To-Do

- use of motor current to detect stall
- maybe warn when a manual plate rotation offsets the feeding schedule
- scheduled meals are skipped while a previous meal is still in progress (todo: consider queue)
- better calibration of temp sensor, if possible
- bring some features to other devices

## Disassembly

To access the motherboard, remove all four rubber feet and the battery cover, then unscrew all 8 screws on the bottom of the device (the 3 visible perimeter screws, 4 under the feet, and 1 inside the battery compartment).

![Bottom of the PLAF109 with rubber feet and battery cover removed, showing all 8 screw locations](./assets/base_screws.jpg)

Newer models of the PLAF109 have a removable fan grill on the side — unscrew the two screws holding the cover. (On older revisions without a removable grill, you do not need to unscrew the fan vent.)

![Removable fan grill on newer PLAF109 models held by two screws](./assets/fan_grill.jpg)

Carefully unclip and lift the bottom cover. The battery, DC-in power, and reset cables remain attached underneath and must be disconnected to completely remove the cover.

![Lifting the bottom cover carefully while the battery, power, and reset cables are still attached](./assets/bottom_cover_cables.jpg)

Once detached, you can see the battery, DC-in, and reset cables on the underside of the bottom cover. You can reconnect just the red DC-in power cable (`CON7`) later to power the board while flashing if you don't want to rely on your serial adapter's `VCC`.

![Underside of the detached bottom cover showing the battery, DC-in power (CON7), and reset cables](./assets/bottom_cover_underside.jpg)

Before unplugging anything from the motherboard, take a reference photo of all the connectors. Factory connectors are secured with hot glue — on some units the glue is hard and brittle and peels away fairly easily, while on others it is stubborn, so work carefully to avoid damaging the cables or headers.

![Motherboard installed inside the feeder with connectors secured by factory hot glue](./assets/motherboard_installed.jpg)

*Please note that if you disassemble further for any reason: if you remove the cooling fins and TEC plate (ceramic sandwich under it), it is critical you put it back in the same orientation, or you may accidentally cook your food or even cause a housefire from heat buildup. You have been warned.*

## Connecting via Serial

The PLAF109 uses an [`ESP32-C3-WROOM-02U`](https://documentation.espressif.com/esp32-c3-wroom-02_datasheet_en.html#%5B12,%22XYZ%22,56.69,436.45,null%5D) and an `aw9523` I2C GPIO expander, and it has no dedicated boot button to enter programming mode.

![Close-up of the ESP32-C3-WROOM-02U module on the motherboard showing GPIO9 (Pin 8)](./assets/esp32_chip.jpg)

![Pinout of the ESP32-C3-WROOM-02U, top of diagram is the side with the antenna connector](https://github.com/user-attachments/assets/a2bdcd5e-0cec-4a6d-9303-5f37277290ef)

Locate the 4-pin `ISP` header (`GND`, `TX`, `RX`, `VCC`) along the top edge of the motherboard:

![Front of the removed motherboard (PLAF109 MainBoard V1.0) showing the ISP header (GND, TX, RX, VCC)](./assets/motherboard.jpg)

Solder a 4-pin male header (or wires) to the `GND`, `TX`, `RX`, and `VCC` pads. You might be able to flash by manually holding contacts to them, but soldering a header is much more reliable and leaves plenty of clearance when reassembling.

![Close-up of the 4-pin ISP header (GND, TX, RX, VCC) with a 4-pin male header ready to solder](./assets/isp_header_prep.jpg)

![4-pin male header soldered to the ISP (GND, TX, RX, VCC) pads](./assets/isp_header_soldered.jpg)

Connect the `GND`, `TX`, and `RX` lines (and `3.3V` to `VCC` if not powering via the feeder's own power cable) between your USB-to-serial adapter and the soldered `ISP` header.

## Entering Programming Mode

The ESP32-C3 starts in programming mode when `GPIO9` is pulled low (connected to `GND`) at power-on. You have two options for accessing `GPIO9`:

- **Directly on the ESP32-C3 module (no extra soldering):** Hold a grounded jumper wire directly onto Pin 8 (`GPIO9`) of the `ESP32-C3-WROOM-02U` module while applying power.
- **Via `TP4` on the back of the motherboard:** The contact pad labeled `TP4` is a test point connected to `GPIO9`. If you want permanent access to `GPIO9` after reinstalling the motherboard, solder a wire to `TP4`.

![Holding a grounded jumper wire directly onto the ESP32-C3 GPIO9 pin (Pin 8) to enter programming mode](./assets/gpio9_jumper.jpg)

![Back of the motherboard showing the TP4 test point (GPIO9)](./assets/motherboard_back.jpg)

1. Disconnect all power sources from the motherboard.
2. Pull `GPIO9` low by connecting Pin 8 on the ESP32-C3 module (or `TP4` on the back) to `GND`.
3. Connect the USB-to-serial adapter to your computer.
4. Supply power to the motherboard (for example, by plugging in the feeder's power cable through `CON7` while holding the `GPIO9` jumper in place). The chip starts in programming mode.

![Holding GPIO9 low while connecting power through the feeder's power cable (CON7)](./assets/entering_prog_mode.jpg)

5. Release/disconnect `GPIO9` from `GND`.
6. Backup and flash, continuing the guide from the [main README](../README.md#flashing-esphome).

![Full flashing setup: USB-to-serial adapter wired to the ISP header, feeder power cable attached to CON7, and GPIO9 jumper released](./assets/flashing_setup.jpg)

7. Disconnect and reconnect power. The chip will boot the new firmware.

If the ESP32-C3 does not start in programming mode, make sure your `GPIO9`-to-`GND` connection has solid contact at power-on, then repeat steps 1 to 4.

> [!NOTE]
> I have not personally tried the automatic `DTR`/`RTS` method below.

If your serial adapter has `DTR` and `RTS` lines, you can let `esptool` enter and exit programming mode automatically instead of power-cycling by hand. Connect `DTR` to `GPIO9` (`TP4`) and `RTS` to `EN`, then connect or power the board so `esptool` pulls `GPIO9` low. Use a 1 kΩ series resistor on `DTR` to protect the pin, or short it directly if you live life on the edge. Per the chip manual you may only need `DTR` to `GPIO9`, but connecting `RTS` to `EN` also works and lets `esptool` reset the board after flashing.

## Reassembly

Reinstall the motherboard and reconnect all headers firmly using your reference photo. A soldered 4-pin `ISP` header clears the enclosure and can stay in place. Reconnect the bottom cover's battery, DC-in power, and reset cables before clipping the base back on and reinstalling the screws, rubber feet, battery cover, and (if present) fan grill.

![Motherboard reinstalled in the feeder with all connectors reattached and the soldered 4-pin ISP header clearing the case](./assets/motherboard_reinstalled.jpg)

## Customization

You can customize the configuration with substitutions:

```yaml
substitutions:
  name: plaf109  # custom name for your device
  friendly_name: Polar Wet Food Feeder  # used in HAOS, dashboard, and default UI
  dashboard: true  # replace the stock web UI with the custom dashboard

packages:
  plaf109: github://JakeShirley/esphome-petlibro-plaf109/plaf109/config.yaml@main
```

If that's not enough, you can override components manually. If you wish to not require auth for the dashboard/web_server, for example:

```yaml
packages:
  plaf109: github://JakeShirley/esphome-petlibro-plaf109/plaf109/config.yaml@main

web_server:
  auth: !remove
```

Or if you wish to use the stock ESPHome web UI (loaded from the internet, saving flash space) instead of the custom dashboard:

```yaml
substitutions:
  dashboard: false

packages:
  plaf109: github://JakeShirley/esphome-petlibro-plaf109/plaf109/config.yaml@main
```
