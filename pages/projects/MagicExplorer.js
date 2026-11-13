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
            pageTitle: "MagicExplorer"
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
                name: 'MagicExplorer',
                description: 'MagicExplorer is an action 2D game made with Unity, where you play as a wizard that\'s exploring a dungeon full of enemies.',
                codeRepository: 'https://github.com/gianluca-rainis/MagicExplorer'
            }} />
            <Nav />

            <main className={styles.projectPage}>
                <header className={styles.projectHeader}>
                    <Link href='/projects' className={styles.backLink}><MoveLeft className={styles.backarrowIcon} /> All projects</Link>
                    <div>
                        <div className={styles.projectHeaderInfo}>
                            <h1>MagicExplorer</h1>
                            <ul>
                                <li className={styles.projectCategory}>Videogame</li>
                                <li className={styles.projectStatus}>Finished</li>
                            </ul>
                        </div>
                        <p className={styles.projectDescription}>MagicExplorer is an action 2D game made with Unity, where you play as a wizard that's exploring a dungeon full of enemies.</p>
                        <ul className={styles.projectTags}>
                            <li>videogame</li>
                            <li>unity</li>
                            <li>C#</li>
                            <li>2D</li>
                            <li>pixelart</li>
                            <li>dungeon</li>
                        </ul>
                    </div>
                    <img src="/projects/MagicExplorerPreview.png" alt="Project image" className={styles.projectImage} />
                    <div className={styles.projectLinks}>
                        <a href="https://github.com/gianluca-rainis/magicExplorer" className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                            <img src="/GitHubLogo.svg" alt="GitHub icon" />
                            <div className={styles.projectLinkText}>
                                <p>View on GitHub <MoveRight className={styles.forwardArrowIcon} /></p>
                                <p>Source Code, Documentation & More</p>
                            </div>
                        </a>
                        <a href="https://var-grdev.itch.io/magicexplorer" className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                            <LinkIcon />
                            <div className={styles.projectLinkText}>
                                <p>Play on itch.io <MoveRight className={styles.forwardArrowIcon} /></p>
                                <p>Play MagicExplorer in your browser or on Windows or Android</p>
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
                                MagicExplorer is a 2D action game developed in Unity.
                                You play as a lone wizard exploring a dungeon, fighting off dangerous creatures with only three spells.
                            </p>
                            <p>
                                The goal is simple: explore the whole dungeon, defeat as many enemies as you can and reach the highest score.
                                The score grows with every enemy defeated and with the time you survive, so you have to move swiftly, attack strategically and defend yourself.
                            </p>
                            <p>
                                All the graphics of the game were drawn by me, in a pixel art style.
                            </p>
                            <img src="/projects/MagicExplorerGameplay.png" alt="MagicExplorer gameplay" />
                            <citation>The wizard exploring the dungeon</citation>
                        </section>
                        <section id="architecture">
                            <h2>Architecture</h2>

                            <h3>Game behavior</h3>
                            <p>
                                The game is a mix of exploration and combat.
                                The player moves through the rooms of the dungeon, meets the enemies and has to decide when to attack and when to keep the distance.
                            </p>
                            <p>
                                The health of the wizard is shown with a series of hearts.
                                When the hearts are over, the run ends, and the score reached is the result of the game.
                            </p>

                            <h3>Spells</h3>
                            <p>
                                The wizard has three spells, each one with its own button.
                                Every spell has a cooldown, so it cannot be cast continuously, and it is cast in the direction the player is aiming.
                            </p>
                            <ul>
                                <li><strong>Firebolt</strong>: the main offensive spell.</li>
                                <li><strong>AirWall</strong>: a spell that pushes enemies back while dealing some damage.</li>
                                <li><strong>WaterTrap</strong>: a non-moving spell that deals a lot of damage to enemies that land on it.</li>
                            </ul>

                            <h3>Power-ups</h3>
                            <p>
                                During the exploration the wizard can find some power-ups, which help to survive longer and to become stronger.
                            </p>
                            <ul>
                                <li><strong>Red heart</strong>: restores 1 HP.</li>
                                <li><strong>Golden heart</strong>: restores all the health and adds one extra HP, so the maximum health of the wizard grows.</li>
                                <li><strong>Power</strong>: raises the level of one of the three spells, chosen randomly.</li>
                            </ul>
                            <p>
                                A spell that gains a level becomes better in every aspect: it deals more damage, it moves faster if it is a moving spell, it has a stronger kickback on the enemies and the delay between one cast and the next one is shorter.
                                Since the spell to upgrade is random, every run develops differently, and the player has to adapt the style of play to the spells that become stronger.
                            </p>
                            <img src="/projects/MagicExplorerRoomWithPowerups.png" alt="A room with two powerups" />
                            <citation>A room with two powerups</citation>

                            <h3>Enemies</h3>
                            <p>
                                The dungeon is populated by different types of enemies.
                                Each type has its own damage, its own speed and its own bonus points, so the stronger or faster enemies are also the ones that give the best reward.
                            </p>
                            <img src="/projects/MagicExplorerBlobTable.png" alt="MagicExplorer blob enemy sprite table" />
                            <citation>The animation table of a blob</citation>

                            <h3>Bosses</h3>
                            <p>
                                Among the normal enemies, the dungeon hides some bosses, all of them shaped like a dragon.
                                They are the most dangerous creatures of the game, and every one of them is a real obstacle on the way of the wizard.
                            </p>
                            <p>
                                Bosses are very heavy, and this changes the way they behave compared to the other enemies:
                            </p>
                            <ul>
                                <li><strong>Lower kickback</strong>: the kickback is customized for every enemy, and for the bosses it is much lower, so the spells barely push them back.</li>
                                <li><strong>Slow movements</strong>: they move more slowly than the other enemies.</li>
                                <li><strong>Big size</strong>: they take up a large part of the room, which makes them hard to avoid.</li>
                                <li><strong>High damage</strong>: a single hit takes away a lot of health.</li>
                                <li><strong>A lot of health</strong>: defeating one requires many hits.</li>
                            </ul>
                            <p>
                                Because of their size, getting around a boss is difficult, and facing one without being strong enough is even harder.
                                The player is pushed to explore the dungeon first, collect the power-ups and level up the spells before trying to defeat a boss.
                            </p>
                            <p>
                                Unlike the other enemies, a boss that has been defeated does not respawn, so every one of them has to be beaten only once.
                            </p>
                            <img src="/projects/MagicExplorerBoss.png" alt="A room with the boss" />
                            <citation>A room with the boss</citation>

                            <h3>Controls</h3>
                            <p>
                                The game can be played with keyboard or with a controller.
                                A pause menu, opened with a dedicated button, shows the options, the settings and a reminder of the keys.
                            </p>
                            <h4>Controls Table</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Action</th>
                                        <th>Keyboard</th>
                                        <th>Controller</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Movements</td>
                                        <td><code>WASD</code> / <code>Arrow Keys</code></td>
                                        <td>GamePad / Arrows</td>
                                    </tr>
                                    <tr>
                                        <td>Cast Firebolt</td>
                                        <td><code>J</code></td>
                                        <td><code>B</code> (Or low button)</td>
                                    </tr>
                                    <tr>
                                        <td>Cast AirWall</td>
                                        <td><code>K</code></td>
                                        <td><code>A</code> (Or right button)</td>
                                    </tr>
                                    <tr>
                                        <td>Cast WaterTrap</td>
                                        <td><code>L</code></td>
                                        <td><code>X</code> (Or up button)</td>
                                    </tr>
                                    <tr>
                                        <td>Pause / Menu</td>
                                        <td><code>Esc</code></td>
                                        <td><code>Start</code> (Or equivalent)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                        <section id="code">
                            <h2>Code</h2>
                            <p>
                                MagicExplorer is developed in Unity, with scripts written in C#.
                                The project has a modular scene architecture, where the player, the firebolt, the enemies and the user interface are separate parts that work together.
                            </p>

                            <h3>Modular design</h3>
                            <p>
                                Every element of the game has its own responsibility.
                                The player handles the movement and the casting of the spells, the spells handle their own cooldown and direction, the enemies handle their behavior and the damage they deal, and the interface shows the hearts, the score and the pause menu.
                            </p>
                            <p>
                                Keeping these parts separated made it easy to add new enemy types: each one only needs its own values for damage, speed and bonus points, while the rest of the game stays the same.
                            </p>
                        </section>
                        <section id="resources">
                            <h2>Resources</h2>
                            <p>
                                Explore the resources available for MagicExplorer, including the downloads, the source code and the online game.
                            </p>

                            <h3>Download</h3>
                            <p>
                                The game is available on itch.io for Windows and Android.
                                On Windows, download the installer, run it and follow the instructions.
                                On Android, download the <code>.apk</code> file and open it to install the game.
                            </p>
                            <p>
                                <a href="https://var-grdev.itch.io/magicexplorer" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', width: 'fit-content' }}>
                                    Download on itch.io <MoveRight className={styles.forwardarrowIcon} />
                                </a>
                            </p>

                            <h3>Source Repository</h3>
                            <p>
                                All project files, including the scripts, the scenes and the textures, are publicly available on GitHub under the MIT license.
                            </p>
                            <p>
                                <a href="https://github.com/gianluca-rainis/magicExplorer" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', width: 'fit-content' }}>
                                    Visit the GitHub repository <MoveRight className={styles.forwardarrowIcon} />
                                </a>
                            </p>
                        </section>
                        <section id="support">
                            <h2>Support</h2>
                            <p>
                                Found a bug, have a question, or want to contribute to MagicExplorer?
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
