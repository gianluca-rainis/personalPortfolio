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
            pageTitle: "Beyond the Quarks"
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
            <Head pageTitle={pageTitle} pageUrl={path} />
            <Nav />

            <main className={styles.projectPage}>
                <header className={styles.projectHeader}>
                    <Link href='/projects' className={styles.backLink}><MoveLeft className={styles.backarrowIcon} /> All projects</Link>
                    <div>
                        <div className={styles.projectHeaderInfo}>
                            <h1>Beyond the Quarks</h1>
                            <ul>
                                <li className={styles.projectCategory}>Videogame</li>
                                <li className={styles.projectStatus}>Paused</li>
                            </ul>
                        </div>
                        <p className={styles.projectDescription}>A 2D sci-fi exploration and adventure game developed in Unity. Fix your wormhole device piece by piece, hopping across alien realities until you can finally return home.</p>
                        <ul className={styles.projectTags}>
                            <li>videogame</li>
                            <li>unity</li>
                            <li>C#</li>
                            <li>2D</li>
                            <li>pixelart</li>
                            <li>adventure</li>
                            <li>multiverse</li>
                        </ul>
                    </div>
                    <img src="/projects/BeyondTheQuarksPreview.png" alt="Project image" className={styles.projectImage} />
                    <div className={styles.projectLinks}>
                        <a href="https://github.com/gianluca-rainis/BeyondTheQuarks" className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                            <img src="/GitHubLogo.svg" alt="GitHub icon" />
                            <div className={styles.projectLinkText}>
                                <p>View on GitHub <MoveRight className={styles.forwardArrowIcon} /></p>
                                <p>Source Code, Documentation & More</p>
                            </div>
                        </a>
                        <a href="https://var-grdev.itch.io/beyond-the-quarks" className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                            <LinkIcon />
                            <div className={styles.projectLinkText}>
                                <p>Play on itch.io <MoveRight className={styles.forwardArrowIcon} /></p>
                                <p>Try the game directly in your browser</p>
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
                                Beyond the Quarks is a 2D sci-fi exploration and adventure game developed in Unity.
                                You play as an explorer stranded in an unknown universe, with a broken wormhole device as the only way back home.
                                The device is too damaged to be repaired in one go, so you have to fix it piece by piece, jumping across alien realities until you can finally return.
                            </p>

                            <h3>Plot</h3>
                            <p>
                                In the near future, an advanced AI develops a technology capable of generating wormholes and opening pathways between parallel universes.
                                The result is <strong>Q.U.A.R.K.</strong> (<i>Quantum Universal Aperture and Relocation Key</i>), a device designed to move matter safely across the multiverse.
                            </p>
                            <p>
                                After years of testing, NASA launches the first interuniversal exploration mission, and you are chosen to travel to a safe universe.
                                Something goes wrong mid-jump: Q.U.A.R.K. malfunctions, the wormhole collapses, and you are thrown into a completely unknown universe.
                            </p>
                            <p>
                                Each partial fix only has enough power for one more jump, sending you to another random universe.
                                Every world you visit contains new environments, resources, dangers and mysteries.
                                Some universes may hold the components you need, while others may reveal clues about the deepest secrets of the multiverse itself.
                            </p>
                            <img src="/projects/BeyondTheQuarksPreview.png" alt="Beyond the Quarks cover" />
                            <citation>The cover of Beyond the Quarks</citation>
                        </section>
                        <section id="architecture">
                            <h2>Architecture</h2>

                            <h3>Game behavior</h3>
                            <p>
                                The game is built around a simple loop: explore the current universe, find what you need to repair Q.U.A.R.K., fix it and jump to the next universe.
                                Since every repair only allows one more jump, the player can never settle in a single world, and every universe is a new place to explore.
                            </p>
                            <p>
                                The game is played from a top-down point of view, in pixel art, and it is a single player experience.
                            </p>

                            <h3>Rooms & Spaces</h3>
                            <p>
                                Every universe is built from two different kinds of areas: <strong>rooms</strong> and <strong>spaces</strong>.
                                They are two distinct ways of exploring, and the game switches between them depending on where the player is.
                            </p>
                            <p>
                                A <strong>room</strong> is an area exactly as big as the screen, like the inside of a building, a laboratory or a cave chamber.
                                The whole room is always visible, so the player can see everything it contains at a glance: the objects, the characters and the exits.
                            </p>
                            <p>
                                A <strong>space</strong> is an open area, much larger than the screen, like an outdoor environment of an alien world.
                                Here the player is not limited to a single view and can walk freely through a small open world, discovering what is beyond the edge of the screen.
                            </p>
                            <p>
                                The camera adapts dynamically to the type of area the player is in:
                            </p>
                            <ul>
                                <li><strong>In a room</strong>, the camera is fixed on the view of the room. The player moves inside the room while the camera stays still. When the player leaves through a door, the camera follows the change of room and moves to the next one.</li>
                                <li><strong>In a space</strong>, the camera follows the player, who is kept at the center of the screen. The player moves through the open world and the scenery scrolls around them.</li>
                            </ul>
                            <p>
                                This difference changes the feeling of the game.
                                Rooms give a controlled and compact scene, ideal for dialogues, puzzles and the places where the player looks for the pieces of Q.U.A.R.K.
                                Spaces give a sense of scale and discovery, which fits the idea of being lost on an alien world.
                            </p>
                            <p>
                                The transition between the two types of area has to be seamless: the camera changes its behavior as soon as the player enters a new area, without cuts that could break the flow of the exploration.
                                Since the whole movement of the game depends on this, the camera logic was one of the first parts of the project to be built, and one of the parts that required the most fixes during the development.
                            </p>

                            <h3>Story and characters</h3>
                            <p>
                                The story is told through an opening sequence and a stage intro cutscene, where the text is shown with a typing effect and a typing sound.
                                During the exploration the player can also talk with the characters of the universes through a dialogue system.
                            </p>
                            <img src="/projects/BeyondTheQuarksGameplay.png" alt="Beyond the Quarks gameplay" />
                            <citation>A scene from the game</citation>

                            <h3>Controls</h3>
                            <p>
                                The game can be played with keyboard or with a controller.
                            </p>
                            <h4>Controls Table</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Platform</th>
                                        <th>Movements</th>
                                        <th>Interact</th>
                                        <th>Confirm</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>PC</td>
                                        <td><code>WASD</code> / <code>Arrow Keys</code></td>
                                        <td><code>E</code> / <code>Enter</code></td>
                                        <td><code>Enter</code></td>
                                    </tr>
                                    <tr>
                                        <td>Controller</td>
                                        <td>Left joystick</td>
                                        <td>North Button</td>
                                        <td>North Button</td>
                                    </tr>
                                    <tr>
                                        <td>Console</td>
                                        <td>Left joystick / Arrows</td>
                                        <td>North Button</td>
                                        <td>North Button</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                        <section id="code">
                            <h2>Code</h2>
                            <p>
                                Beyond the Quarks is developed in Unity, with scripts written in C#.
                                The code is split in small scripts, each one responsible for a single part of the game, so the room system, the dialogues and the story scenes can evolve separately.
                                The following sections explore the main parts of the implementation.
                            </p>

                            <h3>Project structure</h3>
                            <p>
                                The repository is a standard Unity project, with an extra folder for the files that are not part of the game itself.
                            </p>
                            <pre>
                                <code>
                                    {String.raw`BeyondTheQuarks/
├── Assets/            # Scenes, scripts, images and all the game content
├── Other/             # Covers and files outside the game
├── Packages/          # Unity packages
└── ProjectSettings/   # Unity project settings`}
                                </code>
                            </pre>

                            <h3>Room system</h3>
                            <p>
                                The room system was built from scratch and it is split in a few scripts:
                            </p>
                            <ul>
                                <li><code>PlayerMovement</code>: reads the input and moves the player.</li>
                                <li><code>RoomSizeManager</code>: stores the size of the current room.</li>
                                <li><code>CameraRoomManager</code>: moves the camera and keeps it inside the room.</li>
                                <li><code>DoorManager</code>: handles the doors and the passage from a room to the next one.</li>
                                <li><code>LetterboxCamera</code>: keeps the correct aspect ratio on every screen.</li>
                            </ul>
                            <p>
                                Keeping these responsibilities separated made it easier to fix the problems found during the development, like the camera drifting during the transitions or the wrong direction detected when passing through a door.
                            </p>

                            <h3>Story scenes</h3>
                            <p>
                                The story scenes use a dedicated script that shows the text of the story one character at a time, with a typing sound.
                                The same approach is used in the dialogues with the characters, which share the interaction system used by the rest of the game.
                            </p>
                        </section>
                        <section id="resources">
                            <h2>Resources</h2>
                            <p>
                                Explore the resources available for Beyond the Quarks, including the playable version, the source code and the documentation.
                            </p>

                            <h3>Play the game</h3>
                            <p>
                                The game is available on itch.io as an HTML5 prototype, so it can be played directly in the browser, without any installation.
                            </p>
                            <p>
                                <a href="https://var-grdev.itch.io/beyond-the-quarks" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', width: 'fit-content' }}>
                                    Play on itch.io <MoveRight className={styles.forwardarrowIcon} />
                                </a>
                            </p>

                            <h3>Source Repository</h3>
                            <p>
                                All project files, including the scripts, the scenes and the assets, are publicly available on GitHub under the <i>Beyond the Quarks License</i>.
                            </p>
                            <p>
                                <a href="https://github.com/gianluca-rainis/BeyondTheQuarks" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', width: 'fit-content' }}>
                                    Visit the GitHub repository <MoveRight className={styles.forwardarrowIcon} />
                                </a>
                            </p>

                            <h3>Credits</h3>
                            <p>
                                The idea, the assets and the code of the game are made by me.
                                AI was used as little as possible: only as a support for some parts of the code, and for a few images of the opening sequence, which were then retouched by me.
                                All the other assets were created from scratch.
                            </p>
                        </section>
                        <section id="support">
                            <h2>Support</h2>
                            <p>
                                Found a bug, have a question, or want to contribute to Beyond the Quarks?
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
