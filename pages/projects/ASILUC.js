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
            pageTitle: "ASILUC"
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
                name: 'ASILUC',
                description: 'An ASIC designed to function as an ALU.',
                codeRepository: 'https://github.com/gianluca-rainis/ASILUC'
            }} />

            <Nav />

            <main className={styles.projectPage}>
                <header className={styles.projectHeader}>
                    <Link href='/projects' className={styles.backLink}><MoveLeft className={styles.backarrowIcon} /> All projects</Link>
                    <div>
                        <div className={styles.projectHeaderInfo}>
                            <h1>ASILUC</h1>
                            <ul>
                                <li className={styles.projectCategory}>ASIC</li>
                                <li className={styles.projectStatus}>In Development</li>
                            </ul>
                        </div>
                        <p className={styles.projectDescription}>An ASIC designed to function as an ALU.</p>
                        <ul className={styles.projectTags}>
                            <li>ALU</li>
                            <li>ASIC</li>
                            <li>hardware</li>
                        </ul>
                    </div>
                    <img src="/projects/ASILUCPreview.png" alt="Project image" className={styles.projectImage} />
                    <div className={styles.projectLinks}>
                        <a href="https://github.com/gianluca-rainis/ASILUC" className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                            <img src="/GitHubLogo.svg" alt="GitHub icon" />
                            <div className={styles.projectLinkText}>
                                <p>View on GitHub <MoveRight className={styles.forwardArrowIcon} /></p>
                                <p>Source Code, Documentation & More</p>
                            </div>
                        </a>
                        <a href="https://github.com/gianluca-rainis/ASILUC/blob/main/docs/info.md" className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                            <BookOpenText />
                            <div className={styles.projectLinkText}>
                                <p>Read the Documentation <MoveRight className={styles.forwardArrowIcon} /></p>
                                <p>Technical Informations, Guides, Tutorials & Examples</p>
                            </div>
                        </a>
                        <a href="https://gds-viewer.tinytapeout.com/?model=https://gianluca-rainis.github.io/ASILUC/tinytapeout.oas&pdk=gf180mcuD" className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                            <LinkIcon />
                            <div className={styles.projectLinkText}>
                                <p>GDS Viewer <MoveRight className={styles.forwardArrowIcon} /></p>
                                <p>Look at the ASILUC's 3D model</p>
                            </div>
                        </a>
                        <a href="https://gds-explorer.tinytapeout.com/viewer?file=https://gianluca-rainis.github.io/ASILUC/tinytapeout.oas&pdk=gf180mcuD" className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                            <LinkIcon />
                            <div className={styles.projectLinkText}>
                                <p>TinyTapeout Simulator <MoveRight className={styles.forwardArrowIcon} /></p>
                                <p>Try ASILUC in the TinyTapeout Simulator</p>
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
                            <Link href="#support"><BookOpenText /> Support</Link>
                        </nav>
                        <details className={styles.asideMenu}>
                            <summary>On this page</summary>
                            <nav aria-label="Project sections">
                                <Link href="#overview"><BookOpenText /> Overview</Link>
                                <Link href="#architecture"><BookOpenText /> Architecture</Link>
                                <Link href="#code"><BookOpenText /> Code</Link>
                                <Link href="#resources"><BookOpenText /> Resources</Link>
                                <Link href="#support"><BookOpenText /> Support</Link>
                            </nav>
                        </details>
                    </aside>
                    <article className={styles.projectArticle}>
                        <section id="overview">
                            <h2>Overview</h2>
                            <p>
                                ASILUC is a custom designed ASIC (Application Specific Integrated Circuit) that works as a simple ALU.
                                ASILUC currently supports the sum, the subtraction, the moltiplication and the division of two 8-bit numbers.
                                The result is given as a 16-bit number to support even big numbers operations.
                            </p>
                        </section>
                        <section id="architecture">
                            <h2>Architecture</h2>

                            <h3>ASILUC behavior</h3>
                            <p>
                                ASILUC's default behavior is <code>NOP</code>. In this status, all inputs (<code>ui_in</code>) are ignored.
                            </p>
                            <p>
                                When <code>uio_in</code> strictly changes from <code>NOP</code> to one of the operations, ASILUC starts the command reading: it waits <strong>three clock cycles</strong> to read the command associated with the operation to be executed, so the signal has time to stabilize, preventing errors.
                                Once ASILUC reads the command, it reads the first 8-bit number from <code>ui_in</code> for <strong>3 cycles</strong> (the value saved is the one on the third cycle), and then, it reads the second 8-bit number for <strong>3 cycles</strong>.
                            </p>
                            <p>
                                <code>uio_in</code> ignores any unexpected command changes: the command read on the third cycle after the change from <code>NOP</code> is the one executed.
                                If the command returns to <code>NOP</code> before the third cycle, the reading is aborted.
                            </p>
                            <p>
                                Meanwhile, <code>uio_out</code> uses the 4 bits to signal the status of ASILUC:
                            </p>
                            <ul>
                                <li><code>uio_out[7]</code>: <i>busy</i> - 1 if ASILUC is executing operations or if ASILUC put a result byte on <code>uo_out</code>.</li>
                                <li><code>uio_out[6]</code>: <i>status</i> - 1 if ASILUC put a result byte on <code>uo_out</code>, if ASILUC is reading a number on <code>ui_in</code>, or if the given command has been accepted.</li>
                                <li><code>uio_out[5]</code>: <i>highByte</i> - indicates whether the byte on <code>uo_out</code> is the high byte (2nd byte of out) or the low byte (1st byte of out), or indicates whether the read number on <code>ui_in</code> is the second or the first.</li>
                                <li><code>uio_out[4]</code>: <i>error</i> - 1 if an error occurred.</li>
                            </ul>
                            <p>
                                ASILUC processes the operation in the time it needs, maintaining <i>busy</i> at 1.
                                Once ASILUC finishes processing the operation, it sets <i>status</i> to 1 and puts the low byte of the result on <code>uo_out</code> (which, until this point, has always been <code>0x00</code>) (<i>highByte</i> at 0) (keeps the low byte stable for <strong>3 cycles</strong>), and then the high byte of the result (<i>highByte</i> at 1) (keeps it stable for <strong>3 cycles</strong>).
                            </p>
                            <p>
                                Afterwards, it returns with <i>busy</i> at 0, <i>status</i> at 0, <i>highByte</i> at 0, <i>error</i> at 0, and <code>uo_out</code> at <code>0x00</code>.
                            </p>
                            <p>
                                The process restarts, listening to <code>uio_in</code> again.
                            </p>
                            <h3>Additional Informations</h3>
                            <p>
                                <strong>Some additional details</strong>:
                            </p>
                            <ul>
                                <li>While the command is <code>NOP</code>, ASILUC stays in the Idle phase.</li>
                                <li>In Idle ASILUC looks for changes on <code>uio_in[3:0]</code>.</li>
                                <li>If the command read in the third cycle is <code>NOP</code> or <code>Reserved</code>, ASILUC returns to Idle without starting any transaction or operation.</li>
                                <li>If an error occurs during execution, <i>busy</i> goes to 0, <i>status</i> goes to 0, <i>highByte</i> to 0, and <i>error</i> to 1. The error code, associated with the type of error that occurred, is set to <code>uo_out[3:0]</code>. It waits <i>3 clock cycles</i> like this and then returns to normal.</li>
                                <li>The <code>SUB</code> result is <code>A - B</code> in <strong>16-bit two’s complement</strong>. High byte is: <code>0x00</code> if <code>A ≥ B</code>; <code>0xFF</code> if <code>A &lt; B</code>. In case the result is a negative number, <code>|A - B| = 256 - low byte</code>.</li>
                            </ul>
                            <p>
                                <strong>For the master</strong>:
                            </p>
                            <ul>
                                <li>Hold the command stable until <code>status</code> rises.</li>
                                <li>Reset the command to <code>0000</code> between operations.</li>
                                <li>Use a timeout to handle the case where <code>status</code> does not rise.</li>
                                <li><strong>Count clocks from the rising edge of <code>status</code></strong>: the first number must be stable in the first <i>3 cycles</i> (sampled last), the second in the next 3.</li>
                                <li>Once <code>status</code> has risen, the command can return to <code>0000</code> at any time, as ASILUC no longer reads it.</li>
                            </ul>
                            <img src="/projects/ASILUCPreview3D.png" alt="ASILUC 3D Render" />
                            <citation>ASILUC 3D Render</citation>

                            <h3>ASILUC's tables</h3>

                            <h4>ASILUC behavior Table</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sequence</th>
                                        <th>Operation</th>
                                        <th>Duration (clk)</th>
                                        <th>busy</th>
                                        <th>status</th>
                                        <th>highByte</th>
                                        <th>error</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Ø</td>
                                        <td>Idle</td>
                                        <td>∞</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>0</td>
                                        <td>Command Reading</td>
                                        <td>0-2</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Command Accepted / Input (first number)</td>
                                        <td>3-5</td>
                                        <td>0</td>
                                        <td>1</td>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Input (second number)</td>
                                        <td>6-8</td>
                                        <td>0</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Calculating</td>
                                        <td>Variable</td>
                                        <td>1</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>Output (lowest byte)</td>
                                        <td>0-2 (After Calculating)</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>Output (highest byte)</td>
                                        <td>3-5 (After Calculating)</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>Ø</td>
                                        <td>Error</td>
                                        <td>0-2</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>1</td>
                                    </tr>
                                </tbody>
                            </table>

                            <h4>ASILUC status bits Table</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Operation</th>
                                        <th>busy (<code>uio_out[7]</code>)</th>
                                        <th>status (<code>uio_out[6]</code>)</th>
                                        <th>highByte (<code>uio_out[5]</code>)</th>
                                        <th>error (<code>uio_out[4]</code>)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Idle</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>Command Accepted</td>
                                        <td>0</td>
                                        <td>1</td>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>Input (first number)</td>
                                        <td>0</td>
                                        <td>1</td>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>Input (second number)</td>
                                        <td>0</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>Calculating</td>
                                        <td>1</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>Output (lowest byte)</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>0</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>Output (highest byte)</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>Error</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>1</td>
                                    </tr>
                                </tbody>
                            </table>

                            <h4>ASILUC command bits Table</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <td>Command</td>
                                        <td><code>uio_in[3:0]</code></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>NOP</code></td>
                                        <td><code>0000</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>SUM</code></td>
                                        <td><code>0001</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>SUB</code></td>
                                        <td><code>0010</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>MUL</code></td>
                                        <td><code>0011</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>DIV</code></td>
                                        <td><code>0100</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>Reserved</code> (handled as <code>NOP</code>)</td>
                                        <td><code>0101</code>-<code>1111</code></td>
                                    </tr>
                                </tbody>
                            </table>

                            <h4>ASILUC error codes Table</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <td>Error</td>
                                        <td><code>uo_out[3:0]</code></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Generic Error</td>
                                        <td><code>0000</code></td>
                                    </tr>
                                    <tr>
                                        <td>Div 0</td>
                                        <td><code>0001</code></td>
                                    </tr>
                                    <tr>
                                        <td>Unused (if one occurs, it is treated as Generic Error)</td>
                                        <td><code>0010</code>-<code>1111</code></td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                        <section id="code">
                            <h2>Code</h2>
                            <p>
                                ASILUC is developed in Verilog, with a modular design that separates the main control logic, arithmetic operations and timing management.
                                The following sections explore some of the key parts of the implementation and the design choices behind them.
                            </p>

                            <h3>Main Module</h3>
                            <p>
                                The main module coordinates the entire operations of ASILUC.
                                It handles command acquisition, number input, calculation execution and result output.
                            </p>
                            <p>
                                The design uses dedicated control flags to manage each phase of the operation, while <code>asiluc_status</code> (printed in <code>uio_out[7:4]</code>) communicates the current status to the master.
                            </p>

                            <h4>Module instantiation</h4>
                            <p>
                                The main module instantiates the calculation unit and the phase timer, connecting them through dedicated control and data signals.
                            </p>
                            <pre>
                                <code>
                                    {String.raw`phase_timer_ASILUC phase_timer (
    .run(run_phase_timer),
    .clk(clk),
    .rst_n(rst_n),
    .last_cycle(last_cycle)
);

calculation_ASILUC calculation (
    .number1(first_number_in),
    .number2(second_number_in),
    .command(command_in),
    .result(number_out),
    .clk(clk),
    .rst_n(rst_n),
    .error(error_reg),
    .start(asiluc_status == 4'b1000 && !done_calculation),
    .done(done_calculation)
);`}
                                </code>
                            </pre>
                            <p>
                                The calculation module receives the two operands and the selected command.
                                Its execution is triggered when ASILUC enters the calculation state (<code>4'b1000</code>).
                                The <code>done</code> and <code>error</code> signals allow the main module to manage the completion of the operation.
                            </p>

                            <h4>Input acquisition</h4>
                            <p>
                                Before processing a command, ASILUC waits for the command signal to stabilize.
                                The same timing mechanism is used when acquiring the two operands.
                            </p>
                            <pre>
                                <code>
                                    {String.raw`if (last_cycle && asiluc_status == 4'b0100) begin
    first_number_in <= ui_in;
    asiluc_status <= 4'b0110;
end
else if (last_cycle && asiluc_status == 4'b0110) begin
    second_number_in <= ui_in;

    handle_calculation <= 1'b1;
    handle_number_input <= 1'b0;

    asiluc_status <= 4'b1000;
end`}
                                </code>
                            </pre>
                            <p>
                                Each operand is sampled on the third clock cycle of its respective input window.
                                Once both numbers have been acquired, the module switches to the calculation phase.
                            </p>

                            <h4>Result transmission</h4>
                            <p>
                                Since the dedicated output bus is only 8 bits wide, the 16-bit calculation result is transmitted in two separate bytes.
                            </p>
                            <pre>
                                <code>
                                    {String.raw`assign uio_out = {asiluc_status, 4'b0000};
assign uo_out = ((asiluc_status == 4'b1100) || (asiluc_status == 4'b0001)) ? number_out[7:0] : ((asiluc_status == 4'b1110) ? number_out[15:8] : 8'b0);`}
                                </code>
                            </pre>
                            <p>
                                The lower byte is transmitted first, followed by the upper byte.
                                The <code>highByte</code> status bit indicates which part of the result is currently available on the output bus.
                            </p>

                            <h3>Arithmetic Unit</h3>
                            <p>
                                The <code>calculation_ASILUC</code> module is responsible for executing the arithmetic operations.
                                It receives two 8-bit operands and a 4-bit command, and produces a 16-bit result.
                            </p>
                            <p>
                                The operations are implemented using a clocked <code>always</code> block and a <code>case</code> statement, with an asynchronous active-low reset.
                            </p>
                            <h4>Operation selection</h4>
                            <pre>
                                <code>
                                    {String.raw`if (start) begin
    case (command)
        4'b0000: result_reg <= 16'b0; 
        4'b0001: result_reg <= {8'b0, number1} + {8'b0, number2};
        4'b0010: result_reg <= {8'b0, number1} - {8'b0, number2};
        4'b0011: result_reg <= number1 * number2;
        4'b0100: begin
            if (number2 != 0) begin
                result_reg <= {8'b0, number1 / number2};
            end
            else begin
                error_reg <= 1'b1;
                result_reg <= 16'b0000000000000001;
            end
        end
        default: result_reg <= 16'b0;
    endcase

    done_reg <= 1'b1;
end
else begin
    done_reg <= 1'b0;
end`}
                                </code>
                            </pre>
                            <p>
                                The operands are zero-extended to 16 bits before addition and subtraction, allowing the result to retain its full width.
                                Multiplication directly produces a 16-bit result, while division returns an 8-bit quotient extended to 16 bits.
                            </p>
                            <p>
                                The division operation includes an explicit zero-divisor check. If the second operand is zero, the module raises the error signal and returns the error code <code>0x0001</code>.
                            </p>

                            <h3>Phase Timer</h3>
                            <p>
                                The <code>phase_timer_ASILUC</code> module implements a simple three-clock-cycle timer.
                                It is used by the main module to determine when an input sampling or output transmission window has reached its final cycle.
                            </p>
                            <h4>Counter implementation</h4>
                            <pre>
                                <code>
                                    {String.raw`if (!rst_n) begin
    clock_counter <= 2'b00;
end
else begin
    if (run) begin
        if (clock_counter == 2'b10) begin
            clock_counter <= 2'b00;
        end
        else begin
            clock_counter <= clock_counter + 1'b1;
        end
    end
    else begin
        clock_counter <= 2'b00;
    end
end`}
                                </code>
                            </pre>
                            <p>
                                A 2-bit counter cycles through three states: <code>00</code>, <code>01</code> and <code>10</code>.
                                When the timer is disabled, the counter is reset.
                                When enabled, it increments on every rising clock edge and returns to zero after reaching the final count.
                            </p>
                            <pre>
                                <code>
                                    {String.raw`assign last_cycle = run & (clock_counter == 2'b10);`}
                                </code>
                            </pre>
                            <p>
                                The <code>last_cycle</code> signal becomes high when the counter reaches its final state, allowing the main module to synchronize its operations with three-clock-cycle windows.
                            </p>
                        </section>
                        <section id="resources">
                            <h2>Resources</h2>
                            <p>
                                Explore the resources available for ASILUC, including technical documentation, design files and tools to inspect and experiment with the ASIC.
                            </p>

                            <h3>Articles</h3>
                            <div className={styles.projectLinks}>
                                <a href="/docs/designing-an-ASIC-from-scratch" className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                                    <BookOpenText />
                                    <div className={styles.projectLinkText}>
                                        <p>Designing an ASIC from scratch <MoveRight className={styles.forwardArrowIcon} /></p>
                                        <p>The Guide that describe how I designed ASILUC and how it works</p>
                                    </div>
                                </a>
                            </div>

                            <h3>Documentation</h3>
                            <p>
                                The project documentation provides additional technical information about ASILUC, explaining its architecture, operation, interface and implementation.
                            </p>
                            <a href="https://github.com/gianluca-rainis/ASILUC/blob/main/docs/info.md" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', width: 'fit-content' }}>
                                <p style={{ display: 'flex' }}>Read the project documentation <MoveRight className={styles.forwardarrowIcon} /></p>
                            </a>

                            <h3>ASIC Layout</h3>
                            <p>
                                ASILUC's physical design is available as a GDSII layout
                                file. You can inspect the generated layout and explore
                                its physical structure using the online viewers.
                            </p>
                            <ul>
                                <li>
                                    <a href="https://gds-viewer.tinytapeout.com/?model=https://gianluca-rainis.github.io/ASILUC/tinytapeout.oas&pdk=gf180mcuD" target="_blank" rel="noopener noreferrer"  style={{ display: 'flex', width: 'fit-content' }}>
                                        GDS Viewer <MoveRight className={styles.forwardarrowIcon} />
                                    </a>
                                    Inspect the ASIC layout.
                                </li>
                                <li>
                                    <a href="https://gds-explorer.tinytapeout.com/viewer?file=https://gianluca-rainis.github.io/ASILUC/tinytapeout.oas&pdk=gf180mcuD" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', width: 'fit-content' }}>
                                        GDS Explorer <MoveRight className={styles.forwardarrowIcon} />
                                    </a>
                                    Explore the physical design in more detail.
                                </li>
                            </ul>

                            <h3>Simulation</h3>
                            <p>
                                You can experiment with ASILUC using the TinyTapeout simulator, testing its functionality and observing how it behaves with different commands and input values.
                            </p>
                            <p>
                                <a href="https://gds-explorer.tinytapeout.com/viewer?file=https://gianluca-rainis.github.io/ASILUC/tinytapeout.oas&pdk=gf180mcuD" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', width: 'fit-content' }}>
                                    Open TinyTapeout Simulator <MoveRight className={styles.forwardarrowIcon} />
                                </a>
                            </p>

                            <h3>Source Repository</h3>
                            <p>
                                All project files, including the Verilog implementation, configuration files and documentation, are publicly available on GitHub.
                            </p>
                            <p>
                                <a href="https://github.com/gianluca-rainis/ASILUC" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', width: 'fit-content' }}>
                                    Visit the GitHub repository <MoveRight className={styles.forwardarrowIcon} />
                                </a>
                            </p>
                        </section>
                        <section id="support">
                            <h2>Support</h2>
                            <p>
                                Found a bug, have a question, or want to contribute to ASILUC?
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
