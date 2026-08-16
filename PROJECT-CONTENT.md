# Project content — source of truth

Everything below is drawn from Diljit's own reports. Do not add figures, marks, or claims that are not here. Where something is unresolved, it says so, and that should be preserved rather than smoothed over.

---

## Project 01 — Pressure-Jump Cell for Infrared Spectroscopy

**Slug:** `final-year-project`
**Year:** 2026
**Context:** MEng Individual Engineering Project, 40 credits. Mark: 71.
**Supervisor:** Dr Yueting Sun, University of Birmingham.
**Full title:** Redesign and Optimisation of a Piezoelectrically Actuated Pressure-Jump Cell for Infrared Spectroscopy
**Tags:** Individual project · Fusion 360 · Abaqus FEA · 40 credits

### Standfirst

Redesigning a sub-millisecond pressure-jump cell so it could be used for infrared spectroscopy rather than X-ray scattering, and proving the geometry would hold 1,000 bar before committing it to manufacture.

### The problem

Pressure-jump spectroscopy watches molecules change in real time by applying a rapid change in hydrostatic pressure. The fastest existing cell, developed by Möller et al. in 2016, reaches sub-millisecond rise times, but it was built for X-ray scattering. Its geometry is wrong for infrared in two specific ways: the optical opening angle is around 20°, and the sample pathlength is 2 mm.

Infrared imposes the opposite requirements. Water absorbs strongly in the mid-infrared, so transmission needs a pathlength between 10 and 100 µm, and the collection optics need a wide symmetric opening rather than a narrow cone. An IR-compatible cell did exist, from Schiewek et al. in 2007, but solenoid valve actuation limited it to millisecond resolution, which rules out fast kinetics.

No instrument combined sub-millisecond piezoelectric actuation with IR-compatible optics. That gap was the project.

### What was done

The cell was modelled parametrically in Fusion 360 and revised iteratively as the structural analysis fed back into the geometry.

**Optics.** The opening angle was taken from roughly 20° to a full 70°, and the pathlength from 2 mm to 50 µm. The pathlength is set by a single 50 µm raised lip on one diamond seat, with the opposing seat left flush. Using one controlled feature rather than two opposing protrusions removes the assembly uncertainty that would otherwise stack across two independently machined parts.

**Actuator.** The first actuator chosen was wrong, and finding out why changed the design. The HPSt ring-type actuator had a convenient M32 thread that would have screwed straight into the body, but consultation with Piezosystem Jena established that the whole series is limited to 20,000 N blocked force. Generating 1,000 bar through a 20 mm pusher needs 31,416 N, exceeding it by 57%. The actuator was changed to the PSt 1000/35/80 VS45 at 50,000 N, which has no external thread, so a separate bolted cylindrical casing had to be designed around it.

**Displacement.** Treating the walls as rigid, 16.93 µm of actuator travel is needed to reach 1,000 bar in the 117 mm³ internal volume. In practice the actuator pushes against fluid stiffness of 1,856 N/µm, roughly three times its own stiffness at bipolar drive, so the effective displacement falls to 20.15 µm at bipolar and 14.55 µm at unipolar. Single-stage operation to 1,000 bar therefore works with a bipolar amplifier; unipolar drive reaches about 859 bar and needs a 141 bar hydraulic preload first.

**Structural analysis.** Lamé thick-wall estimates came first as a lower bound, then FEA in Abaqus CAE using second-order tetrahedral elements on a half model under 100 MPa internal pressure. A mesh convergence study took the global seed from 3 mm to 1 mm, and peak Von Mises stress fell from 461.7 MPa to 259.6 MPa, a 43.8% reduction. The downward trend confirmed the coarse-mesh figure was an element quality artefact rather than a real concentration. Stresses on the wetted internal surfaces ran between 68 and 196 MPa, agreeing with the 189.3 MPa Lamé estimate.

**Membrane.** This was where the analysis found a genuine problem. Under the required 16.93 µm displacement, peak stress at the clamped rim reached 387 MPa in 316 stainless, exceeding its 250 MPa yield by 55%, meaning plastic deformation on every actuation cycle and low-cycle fatigue failure. Switching to 17-4 PH stainless in the H900 condition, with near-identical elastic modulus so the stiffness is unchanged, gives a yield of 1,170 MPa and a safety factor of 3.5. That single material change was the fix.

### An incidental finding

The Möller cell's practical ceiling of about 660 bar has generally been attributed to its design. Working through the numbers suggested otherwise: the force needed for 660 bar through their 25 mm pusher is 32,453 N, and their unipolar amplifier reduces the actuator's blocked force to roughly 30,000–35,000 N. The limit was the amplifier, not the structure. A bipolar amplifier would have taken the same mechanical design to around 1,540 bar.

### Outcome and honest limits

Both optical targets were achieved in the final geometry. The design was submitted to the university workshop for manufacture as a continuation activity, since machining was not feasible inside the project timeline.

What is not yet proven, and should be stated plainly: the pressure rise time cannot be confirmed analytically and needs measurement on a built cell. Sealing above 700 bar may require PTFE anti-extrusion backup rings, to be determined during proof testing. The alignment shim specification and the sample fill and preload procedure were not completed within the project.

### Figures available

| File | Caption |
|---|---|
| `cover.jpg` | Redesigned pressure cell, actuator casing assembly |
| `cell-assembly.jpg` | Full assembly with section views, operating and testing configurations |
| `optical-section.jpg` | Section through the cell showing the 70° opening and the 50 µm pathlength detail |
| `casing-section.jpg` | Section through the actuator casing |
| `fea-body-stress.jpg` | Von Mises stress and displacement, cell body, 1 mm global seed |
| `fea-membrane.jpg` | Von Mises stress and displacement, 17-4 PH membrane |

### Key numbers for a metadata table

| Field | Value |
|---|---|
| Opening angle | 20° → 70° |
| Pathlength | 2 mm → 50 µm |
| Design pressure | 1,000 bar |
| Internal volume | 117 µL |
| Peak body stress | 259.6 MPa (converged) |
| Membrane safety factor | 3.5 (17-4 PH H900) |
| Tools | Fusion 360, Abaqus CAE |

---

## Project 02 — DCI and HCCI Engine Modelling

**Slug:** `AFPS`
**Year:** 2026
**Context:** Advanced Fuels and Powertrain Systems (AFPS), group of five. Module mark: 73.
**Tags:** Group of five · AVL Cruise M · Combustion modelling

Note the correct expansion is **GDI** (gasoline direct injection), not DCI. The current site says "DCI & HCCI Engine Modelling" and that should be corrected.

### Standfirst

Building, calibrating and modifying single-cylinder engine models in AVL Cruise M across two combustion modes, then assessing what renewable fuels and aftertreatment would be needed to take them towards net zero.

### The work

Seven cases at 1,500 rpm on a common single-cylinder geometry: 90 mm bore, 88.9 mm stroke, 160 mm connecting rod, 11.5:1 compression ratio. Cases 1–3 ran homogeneous charge compression ignition on a low-lift camshaft; cases 4–7 ran gasoline direct injection spark ignition on a high-lift camshaft.

Normalised rate of heat release inputs were derived by hand before modelling: instantaneous cylinder volume per crank angle, log pressure against log volume to extract separate polytropic indices for compression and expansion, then first-law heat release, then normalisation against peak.

### Calibration

Models were tuned against experimental targets for lambda, IMEP, peak pressure and the crank angle of peak pressure. Lambda matched exactly across all seven cases. IMEP stayed within 10% throughout. Six of seven cases matched peak pressure within ±4%; case 3 was the exception at 9% low, because reaching earlier HCCI phasing at higher load needs either a more reactive charge or a higher residual fraction, and both were constrained by the available valve timing range.

Emissions calibration ran into a genuine tool limit worth stating: AVL Cruise M's classic species kinetic model has a floor on CO output that no multiplier reduces, so isCO could not be matched to experiment in any case. CO2 is reported wet and needs dividing by 1.57 for dry-basis comparison.

The NOx results followed the physics cleanly. HCCI cases produced far lower NOx than GDI, consistent with the Zeldovich thermal mechanism needing sustained temperatures above roughly 1800 K. Within the GDI cases NOx rose with load: 3.906, 6.390 and 8.370 g/ikWh across cases 5, 6 and 7.

### Modifications

Three changes were applied across all cases, chosen to cut emissions while holding IMEP roughly constant so the comparison stayed meaningful.

Valve timing was shifted 15° on both intake opening and exhaust closing. For the GDI cases this removed the positive valve overlap that was raising residual gas fraction and pumping losses; CO fell consistently, most sharply in case 7 from 1.03% to 0.39%. For HCCI, where there is no spark and autoignition depends entirely on trapped charge mass and temperature, the same shift moved phasing favourably, and case 3 gained IMEP from 3.48 to 4.60 bar.

Throttle opening was increased 2–5° where applicable, raising air mass flow and improving combustion completeness.

Fuel blends were selected by iteration rather than assumption. For GDI, gasoline-ethanol-water blends held IMEP but added no energy; hydrogen raised IMEP to 3.50 bar but ran rich at lambda 0.89; a hydrogen-heavy blend spiked NOx to 14.53 g/h on elevated flame temperature and was rejected. The blend selected was 85% gasoline, 5% hydrogen, 10% ammonia, reaching stoichiometric lambda at 3.51 bar IMEP with CO at 0.53%. For HCCI the choice was 50% diesel, 45% ammonia, 5% hydrogen, giving lambda 1.47, IMEP 2.87 bar, CO at zero and NOx at 0.05 g/h. Diesel's cetane number secures autoignition while ammonia carries the carbon reduction.

### Wider assessment

The report also covered renewable fuels against the UK's 2050 net-zero commitment, comparing hydrotreated vegetable oil, green hydrogen and e-methanol on technical, environmental, commercial and legal grounds; exhaust aftertreatment across the baseline and modified powertrains, including why a three-way catalyst suits GDI but HCCI needs a diesel oxidation catalyst with SCR, and why the ammonia blend requires an ammonia slip catalyst under Euro 7; and the implications of hybrid electrification for each.

### Diljit's role

One of five. Responsibilities for AVL modelling were divided across the seven cases, with the group initially split between model setup and heat release processing, then calibration cases assigned individually and results consolidated in a shared spreadsheet with a changelog.

### Figures available

| File | Caption |
|---|---|
| `cover.jpg` | Intake system layout: throttle body, air heater tube, plenum and intake runner |
| `exhaust-layout.jpg` | Exhaust system layout and dimensions |

### Key numbers for a metadata table

| Field | Value |
|---|---|
| Cases modelled | 7 |
| Engine speed | 1,500 rpm |
| Bore × stroke | 90 × 88.9 mm |
| Compression ratio | 11.5:1 |
| Lambda match | Exact, all cases |
| IMEP accuracy | Within 10%, all cases |
| Tool | AVL Cruise M |
