import Head from '@/components/Head';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import styles from '@/styles/projects.module.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { MoveLeft, MoveRight, BookOpenText, Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';

export async function getStaticProps() {
    return {
        props: {
            pageTitle: "Z80DevBoard"
        }
    };
}

export default function ProjectPage({ pageTitle }) {
    const path = usePathname();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState('');

    async function handleSupportSubmit(event) {
        event.preventDefault();
        setIsSubmitting(true);
        setFormStatus('');

        const form = event.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    senderName: formData.get('senderName'),
                    replyEmail: formData.get('replyEmail'),
                    subject: formData.get('subject'),
                    message: formData.get('message')
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Unable to send your message.');
            }

            form.reset();
            setFormStatus('Your support message has been sent. Thank you!');
        } catch (error) {
            setFormStatus(error.message || 'Unable to send your message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <Head pageTitle={pageTitle} pageUrl={path} projectData={{
                name: 'Z80DevBoard',
                description: 'The Z80DevBoard is an advanced development board for the Z80 microprocessor, based on the RP2040.',
                codeRepository: 'https://github.com/gianluca-rainis/Z80DevBoard'
            }} />
            <Nav />

            <main className={styles.projectPage}>
                <header className={styles.projectHeader}>
                    <Link href='/projects' className={styles.backLink}><MoveLeft className={styles.backarrowIcon} /> All projects</Link>
                    <div>
                        <div className={styles.projectHeaderInfo}>
                            <h1>Z80DevBoard</h1>
                            <ul>
                                <li className={styles.projectCategory}>PCB</li>
                                <li className={styles.projectStatus}>Paused</li>
                            </ul>
                        </div>
                        <p className={styles.projectDescription}>The Z80DevBoard is an advanced development board for the Z80 microprocessor, based on the RP2040.</p>
                        <ul className={styles.projectTags}>
                            <li>PCB</li>
                            <li>hardware</li>
                            <li>devboard</li>
                            <li>Z80</li>
                            <li>rp2040</li>
                        </ul>
                    </div>
                    <img src="/projects/Z80DevBoardPreview.png" alt="Project image" className={styles.projectImage} />
                    <div className={styles.projectLinks}>
                        <a href="https://github.com/gianluca-rainis/Z80DevBoard" className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                            <img src="/GitHubLogo.svg" alt="GitHub icon" />
                            <div className={styles.projectLinkText}>
                                <p>View on GitHub <MoveRight className={styles.forwardArrowIcon} /></p>
                                <p>Source Code, Documentation & More</p>
                            </div>
                        </a>
                        <a href="https://github.com/gianluca-rainis/Z80DevBoard/blob/main/docs/index.md" className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                            <BookOpenText />
                            <div className={styles.projectLinkText}>
                                <p>Read the Documentation <MoveRight className={styles.forwardArrowIcon} /></p>
                                <p>Technical Informations, Guides, Tutorials & Examples</p>
                            </div>
                        </a>
                        <a href="https://kicanvas.org/?repo=https://github.com/gianluca-rainis/Z80DevBoard" className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                            <LinkIcon />
                            <div className={styles.projectLinkText}>
                                <p>Online PCB Viewer <MoveRight className={styles.forwardArrowIcon} /></p>
                                <p>View the printed circuit board design</p>
                            </div>
                        </a>
                    </div>
                </header>
                <section className={styles.projectContent}>
                    <aside className={styles.aside}>
                        <nav className={styles.desktopAside} aria-label="Project sections">
                            <Link href="#overview"><BookOpenText /> Overview</Link>
                            <Link href="#architecture"><BookOpenText /> Architecture</Link>
                            <Link href="#code"><BookOpenText /> Code</Link>
                            <Link href="#resources"><BookOpenText /> Resources</Link>
                            <Link href="#sponsor"><BookOpenText /> Sponsor</Link>
                            <Link href="#support"><BookOpenText /> Support</Link>
                        </nav>
                        <details className={styles.asideMenu}>
                            <summary>On this page</summary>
                            <nav aria-label="Project sections">
                                <Link href="#overview"><BookOpenText /> Overview</Link>
                                <Link href="#architecture"><BookOpenText /> Architecture</Link>
                                <Link href="#code"><BookOpenText /> Code</Link>
                                <Link href="#resources"><BookOpenText /> Resources</Link>
                                <Link href="#sponsor"><BookOpenText /> Sponsor</Link>
                                <Link href="#support"><BookOpenText /> Support</Link>
                            </nav>
                        </details>
                    </aside>
                    <article className={styles.projectArticle}>
                        <section id="overview">
                            <h2>Overview</h2>
                            <p>
                                The Z80DevBoard is an open source educational board that pairs a Zilog Z84C00, the CMOS version of the classic Z80 microprocessor, with a modern RP2040 microcontroller.
                                It is a bridge between the golden age of 8-bit computing and modern embedded systems.
                            </p>
                            <p>
                                The Z80 is the core that runs the programs, while the RP2040 is the interface between the developer and the board: it loads the programs, watches the Z80 and talks with the computer through USB.
                                Forty LEDs show in real time what happens on the buses of the Z80, and a manual clock allows to execute a program one clock cycle at a time, so every single instruction can be followed.
                            </p>
                            <p>
                                The board was designed to be used in educational kits, and it was sponsored by PCBWay, which produced the PCB.
                                The project is currently paused.
                            </p>
                            <img src="/projects/Z80DevBoard3DFront.png" alt="Z80DevBoard 3D render" />
                            <citation>Z80DevBoard 3D Render</citation>
                        </section>
                        <section id="architecture">
                            <h2>Architecture</h2>

                            <h3>Board behavior</h3>
                            <p>
                                The Z80DevBoard is a 4-layer PCB of 219 x 108.5 mm.
                                The board works at 5V, supplied through the USB-C connector, and an AMS1117-3.3 regulator generates the 3.3V rail for the RP2040 and for the supporting logic.
                            </p>
                            <p>
                                The Z80 executes assembly programs stored in the SRAM, which is the only memory it can see.
                                The RP2040 takes care of everything else, in this sequence:
                            </p>
                            <ol>
                                <li>At the boot, the RP2040 reads the compiled Z80 program from the flash memory.</li>
                                <li>The RP2040 takes the control of the bus and writes the program into the SRAM.</li>
                                <li>The RP2040 releases the Z80 from reset.</li>
                                <li>The Z80 reads its instructions from the SRAM and writes the results back to it, for the whole duration of the program.</li>
                            </ol>
                            <p>
                                During the execution, the RP2040 keeps monitoring the control signals of the Z80, handles the I/O bus cycles and maintains the serial connection with the computer.
                            </p>

                            <h4>Z80DevBoard components Table</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Component</th>
                                        <th>Function</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Z84C00</td>
                                        <td>CMOS Z80 CPU, the execution core of the board</td>
                                    </tr>
                                    <tr>
                                        <td>RP2040</td>
                                        <td>Interface between the developer and the board, runs at 133 MHz with a 12 MHz crystal</td>
                                    </tr>
                                    <tr>
                                        <td>2 x HM62256BLP</td>
                                        <td>Two 32KB asynchronous SRAM, 64 KB of memory in total</td>
                                    </tr>
                                    <tr>
                                        <td>W25Q32JVSS</td>
                                        <td>4MB SPI flash, stores the firmware and the Z80 program</td>
                                    </tr>
                                    <tr>
                                        <td>SN74LVC245APW</td>
                                        <td>Bus transceivers between the 5V Z80 logic and the 3.3V RP2040 logic</td>
                                    </tr>
                                    <tr>
                                        <td>TXS0104EPW</td>
                                        <td>Level shifter for the <code>BUSREQ</code> and <code>BUSACK</code> signals</td>
                                    </tr>
                                    <tr>
                                        <td>3 x 74HC595</td>
                                        <td>Shift registers that let the RP2040 drive the bus with a serial interface</td>
                                    </tr>
                                    <tr>
                                        <td>74HC165</td>
                                        <td>Shift register that lets the RP2040 read the bus back</td>
                                    </tr>
                                    <tr>
                                        <td>74HCT574</td>
                                        <td>Buffers between the bus and the LEDs</td>
                                    </tr>
                                    <tr>
                                        <td>AMS1117-3.3</td>
                                        <td>3.3V voltage regulator</td>
                                    </tr>
                                </tbody>
                            </table>

                            <h3>Memory</h3>
                            <p>
                                The two SRAM chips are mounted in parallel and together cover the 64 KB that the Z80 can address with its 16-bit address bus.
                                Since the SRAM is static, it does not need refresh cycles, so the board does not need a refresh controller and the <code>/RFSH</code> pin of the Z80 stays unused.
                            </p>
                            <p>
                                The flash memory is seen only by the RP2040 through a dedicated SPI bus.
                                For the Z80 it is completely invisible: the CPU only talks with the SRAM.
                            </p>

                            <h3>Clock</h3>
                            <p>
                                The Z80 has its own dedicated oscillator, and it is not driven by the RP2040.
                                An onboard switch selects between the automatic mode, where the clock runs freely, and the manual mode, where the clock moves one step at a time.
                            </p>

                            <h3>LED matrices</h3>
                            <p>
                                The 40 LEDs are organized in matrices and show the state of the address bus, of the data bus and of the control signals.
                                The 74HCT574 buffers capture a snapshot of the bus and hold it stable until the next update, without the risk of corrupting the bus state.
                            </p>
                            <p>
                                Combined with the manual clock, the LEDs update at every step.
                                This way it is possible to see how the Z80 reads from and writes to the memory, without an oscilloscope or a logic analyzer.
                            </p>
                            <img src="/projects/Z80DevBoardLedsData.png" alt="Z80DevBoard LED matrices" />
                            <img src="/projects/Z80DevBoardLedsAddress.png" alt="Z80DevBoard LED matrices" />
                            <citation>The LED matrices showing the state of the buses</citation>

                            <h3>Expansion connectors</h3>
                            <p>
                                The board has two expansion connectors, so it can become the base of a bigger system.
                            </p>
                            <ul>
                                <li><strong>2x20 pins connector</strong>: breaks out all the 40 pins of the Z80, with the address bus, the data bus and the control signals. It is meant for daughter boards that extend the Z80 environment.</li>
                                <li><strong>2x10 pins connector</strong>: exposes the 3.3V and GND rails, the two ADC inputs (<code>ADC0</code> and <code>ADC1</code>) and the pins from <code>GPIO10</code> to <code>GPIO25</code> of the RP2040. It is meant for projects where the RP2040 interacts with external hardware.</li>
                            </ul>

                            <h3>USB-C</h3>
                            <p>
                                A single USB-C 2.0 connector supplies the 5V to the board and connects the RP2040 to the computer.
                                A 500 mA fuse protects the board from overcurrent.
                            </p>
                            <p>
                                The RP2040 appears as a USB CDC serial device, a virtual COM port, used to upload the compiled Z80 programs, to interact with the firmware and to read the output of the Z80 program.
                                No driver is needed.
                            </p>

                            <h3>PCB layers</h3>
                            <h4>Z80DevBoard layers Table</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Layer</th>
                                        <th>Use</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>F.Cu</code></td>
                                        <td>General signal routing</td>
                                    </tr>
                                    <tr>
                                        <td><code>In1.Cu</code></td>
                                        <td>Power distribution, with the 5V and 3.3V rails</td>
                                    </tr>
                                    <tr>
                                        <td><code>In2.Cu</code></td>
                                        <td>Solid ground plane</td>
                                    </tr>
                                    <tr>
                                        <td><code>B.Cu</code></td>
                                        <td>General signal routing</td>
                                    </tr>
                                </tbody>
                            </table>
                            <img src="/projects/Z80DevBoardPCB.png" alt="Z80DevBoard PCB" />
                            <citation>The PCB layout</citation>
                        </section>
                        <section id="code">
                            <h2>Code</h2>
                            <p>
                                The Z80DevBoard has two software parts: the firmware of the RP2040, written in C with the Pico SDK, and the programs for the Z80, written in assembly.
                                The hardware was designed in KiCad.
                                The following sections explore how they work together.
                            </p>

                            <h3>Firmware</h3>
                            <p>
                                The firmware is built with CMake, using the Pico SDK.
                                Its job is to be the bridge between the computer and the Z80, and its main tasks are:
                            </p>
                            <ul>
                                <li>reading the Z80 program from the flash memory and writing it into the SRAM;</li>
                                <li>taking and releasing the control of the bus, with the <code>BUSREQ</code> and <code>BUSACK</code> signals;</li>
                                <li>driving and reading the bus through the shift registers;</li>
                                <li>handling the I/O cycles of the Z80;</li>
                                <li>talking with the computer through the USB serial connection.</li>
                            </ul>
                            <p>
                                The RP2040 can also be debugged through its SWD interface, with a Raspberry Pi Debug Probe or any compatible adapter.
                            </p>

                            <h3>Bus control</h3>
                            <p>
                                The RP2040 and the Z80 share the same buses, so only one of them can drive them at a time.
                                When the RP2040 needs the bus, for example to write a program into the SRAM, it asks for it with <code>BUSREQ</code>, and the Z80 answers with <code>BUSACK</code> when it has released the bus.
                                These two signals pass through a dedicated level shifter, because they cross the border between the 5V and the 3.3V logic.
                            </p>

                            <h3>Z80 programs</h3>
                            <p>
                                The programs of the Z80 are written in assembly, compiled and uploaded to the board through the serial connection.
                                The documentation includes a full chapter about Z80 assembly programming.
                                This is a minimal example of a Z80 program:
                            </p>
                            <pre>
                                <code>
                                    {String.raw`LD A, 0x42       ; load a value in the accumulator
LD (0x8000), A   ; write it in the memory at 0x8000
HALT             ; stop the CPU`}
                                </code>
                            </pre>
                            <p>
                                With the manual clock mode, every one of these instructions can be followed on the LEDs, one clock cycle at a time.
                            </p>
                        </section>
                        <section id="resources">
                            <h2>Resources</h2>
                            <p>
                                Explore the resources available for the Z80DevBoard, including the official documentation, the design files and the source code.
                            </p>

                            <h3>Documentation</h3>
                            <p>
                                The official documentation is structured as a book, and it is designed for educational kits.
                                Each chapter can be read independently, with an introductory part for beginners and a technical deep-dive for those who want to understand every signal.
                            </p>
                            <ul>
                                <li>
                                    <a href="https://github.com/gianluca-rainis/Z80DevBoard/blob/main/docs/introduction.md" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', width: 'fit-content' }}>
                                        Introduction & Project History <MoveRight className={styles.forwardarrowIcon} />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com/gianluca-rainis/Z80DevBoard/blob/main/docs/hardware.md" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', width: 'fit-content' }}>
                                        Hardware Architecture <MoveRight className={styles.forwardarrowIcon} />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com/gianluca-rainis/Z80DevBoard/blob/main/docs/pinout.md" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', width: 'fit-content' }}>
                                        Pinout & Connectors <MoveRight className={styles.forwardarrowIcon} />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com/gianluca-rainis/Z80DevBoard/blob/main/docs/quickstart.md" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', width: 'fit-content' }}>
                                        Quick Start Guide <MoveRight className={styles.forwardarrowIcon} />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com/gianluca-rainis/Z80DevBoard/blob/main/docs/advanced.md" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', width: 'fit-content' }}>
                                        Advanced Projects <MoveRight className={styles.forwardarrowIcon} />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com/gianluca-rainis/Z80DevBoard/blob/main/docs/z80Assembly.md" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', width: 'fit-content' }}>
                                        Z80 Assembly Programming <MoveRight className={styles.forwardarrowIcon} />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com/gianluca-rainis/Z80DevBoard/blob/main/docs/technicalInfo.md" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', width: 'fit-content' }}>
                                        Schematics & KiCad Reference <MoveRight className={styles.forwardarrowIcon} />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com/gianluca-rainis/Z80DevBoard/blob/main/docs/conclusions.md" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', width: 'fit-content' }}>
                                        Conclusions <MoveRight className={styles.forwardarrowIcon} />
                                    </a>
                                </li>
                            </ul>

                            <h3>Source Repository</h3>
                            <p>
                                All project files, including the KiCad project, the firmware and the documentation, are publicly available on GitHub.
                            </p>
                            <p>
                                <a href="https://github.com/gianluca-rainis/Z80DevBoard" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', width: 'fit-content' }}>
                                    Visit the GitHub repository <MoveRight className={styles.forwardarrowIcon} />
                                </a>
                            </p>

                            <h3>License</h3>
                            <p>
                                The hardware design files are licensed under the CERN OHL S v2.0 license, and the firmware is licensed under the MIT License.
                            </p>

                            <h3>Credits</h3>
                            <p>
                                The Z80DevBoard was designed and developed by me, and it was also shown at Open Sauce.
                                No AI was used in the conception, design, engineering or development of the project: every circuit and every design decision is my own work.
                                AI was used only as a writing assistant for some parts of the documentation, and everything was reviewed, verified and edited by me.
                            </p>
                        </section>
                        <section id="sponsor">
                            <h2>Sponsor</h2>
                            <p>
                                The PCB prototyping for this project is sponsored by <a href="https://www.pcbway.com" target="_blank" rel="noopener noreferrer">PCBWay</a>.
                            </p>
                            <p>
                                The <i>boards</i> were manufactured with <strong>high precision</strong>, faithfully <strong>following the PCB design down to the smallest details</strong>.
                                The <i>silkscreen</i> is <strong>crisp and perfectly readable</strong>, with <strong>no errors or misalignments</strong>.
                                The <i>board edges</i> and corner's holes were <strong>cut cleanly and accurately</strong>.
                                The <i>drill holes</i> <strong>match the component footprints exactly</strong>, making placement and soldering straightforward.
                                The <i>SMD pads</i> are <strong>precise and clean</strong>, even for the most challenging footprints, and solder beautifully.
                            </p>
                            <p>
                                The <i>PCBWay website</i> is <strong>intuitive, even for first-time users</strong>. <strong>Placing an order is simple</strong>, and before proceeding to payment <strong>the design is reviewed by their technical staff</strong>, who catch and communicate <strong>any potential manufacturing issues</strong> promptly and professionally, avoiding problems before production even begins.
                            </p>
                            <p>
                                <i>If you are looking for a reliable, high-quality PCB manufacturer for your own projects, <a href="https://www.pcbway.com" target="_blank" rel="noopener noreferrer"><strong>PCBWay</strong></a> is highly recommended!</i>
                            </p>
                            <a href="https://www.pcbway.com" target="_blank" rel="noopener noreferrer">
                                <img src="/projects/PCBWayLogo.png" alt="PCBWay logo" />
                            </a>
                        </section>
                        <section id="support">
                            <h2>Support</h2>
                            <p>
                                Found a bug, have a question, or want to contribute to the Z80DevBoard?
                                Send me a message and I will get back to you.
                            </p>
                            <form className={styles.supportForm} onSubmit={handleSupportSubmit}>
                                <label>
                                    Name <span>(optional)</span>
                                    <input type="text" name="senderName" autoComplete="name" maxLength="100" />
                                </label>
                                <label>
                                    Reply email <span>(optional)</span>
                                    <input type="email" name="replyEmail" autoComplete="email" maxLength="254" />
                                </label>
                                <label>
                                    Subject
                                    <input type="text" name="subject" required maxLength="500" />
                                </label>
                                <label>
                                    Message
                                    <textarea name="message" required rows="7" maxLength="10000" />
                                </label>
                                <button className={styles.supportSubmit} type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Sending...' : 'Send message'}
                                </button>
                                {formStatus && (
                                    <p className={styles.supportStatus} role="status" aria-live="polite">
                                        {formStatus}
                                    </p>
                                )}
                            </form>
                        </section>
                    </article>
                </section>
            </main>

            <Footer />
        </>
    );
}
