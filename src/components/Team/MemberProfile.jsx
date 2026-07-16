import { useEffect, useState } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PropTypes from 'prop-types';
import { GitHubCalendar } from 'react-github-calendar';
import SpotifyPlayer from '../SpotifyPlayer';

import pythonLogo from '../../assets/images/tech-logos/python.svg';
import rLogo from '../../assets/images/tech-logos/r.svg';
import javaLogo from '../../assets/images/tech-logos/java.svg';
import cplusplusLogo from '../../assets/images/tech-logos/cplusplus.svg';
import tensorflowLogo from '../../assets/images/tech-logos/tensorflow.svg';
import pytorchLogo from '../../assets/images/tech-logos/pytorch.svg';
import kerasLogo from '../../assets/images/tech-logos/keras.svg';
import scikitlearnLogo from '../../assets/images/tech-logos/scikitlearn.svg';
import sqlLogo from '../../assets/images/tech-logos/sql.svg';
import mysqlLogo from '../../assets/images/tech-logos/mysql.svg';
import mongodbLogo from '../../assets/images/tech-logos/mongodb.svg';
import cassandraLogo from '../../assets/images/tech-logos/cassandra.svg';
import awsLogo from '../../assets/images/tech-logos/amazonwebservices.svg';
import gcpLogo from '../../assets/images/tech-logos/googlecloud.svg';
import azureLogo from '../../assets/images/tech-logos/azure.svg';
import gitLogo from '../../assets/images/tech-logos/git.svg';
import dockerLogo from '../../assets/images/tech-logos/docker.svg';
import kubernetesLogo from '../../assets/images/tech-logos/kubernetes.svg';
import sparkLogo from '../../assets/images/tech-logos/apachespark.svg';
import typescriptLogo from '../../assets/images/tech-logos/typescript.svg';
import javascriptLogo from '../../assets/images/tech-logos/javascript.svg';
import goLogo from '../../assets/images/tech-logos/go.svg';
import rustLogo from '../../assets/images/tech-logos/rust.svg';
import cLogo from '../../assets/images/tech-logos/c.svg';
import bashLogo from '../../assets/images/tech-logos/bash.svg';
import solidityLogo from '../../assets/images/tech-logos/solidity.svg';
import elixirLogo from '../../assets/images/tech-logos/elixir.svg';
import haskellLogo from '../../assets/images/tech-logos/haskell.svg';
import kotlinLogo from '../../assets/images/tech-logos/kotlin.svg';
import swiftLogo from '../../assets/images/tech-logos/swift.svg';
import scalaLogo from '../../assets/images/tech-logos/scala.svg';
import erlangLogo from '../../assets/images/tech-logos/erlang.svg';
import rubyLogo from '../../assets/images/tech-logos/ruby.svg';
import ocamlLogo from '../../assets/images/tech-logos/ocaml.svg';
import nextjsLogo from '../../assets/images/tech-logos/nextjs.svg';
import reactLogo from '../../assets/images/tech-logos/react.svg';
import viteLogo from '../../assets/images/tech-logos/vitejs.svg';
import nodejsLogo from '../../assets/images/tech-logos/nodejs.svg';
import expressLogo from '../../assets/images/tech-logos/express.svg';
import fastapiLogo from '../../assets/images/tech-logos/fastapi.svg';
import redisLogo from '../../assets/images/tech-logos/redis.svg';
import postgresLogo from '../../assets/images/tech-logos/postgresql.svg';
import graphqlLogo from '../../assets/images/tech-logos/graphql.svg';
import tailwindLogo from '../../assets/images/tech-logos/tailwindcss.svg';
import kafkaLogo from '../../assets/images/tech-logos/kafka.svg';
import linuxLogo from '../../assets/images/tech-logos/linux.svg';
import nginxLogo from '../../assets/images/tech-logos/nginx.svg';
import githubLogo from '../../assets/images/tech-logos/github.svg';
import ethereumChainLogo from '../../assets/images/tech-logos/ethereum.png';
import solanaChainLogo from '../../assets/images/tech-logos/solana.png';
import aptosChainLogo from '../../assets/images/tech-logos/aptos.png';
import suiChainLogo from '../../assets/images/tech-logos/sui.png';
import cosmosChainLogo from '../../assets/images/tech-logos/cosmos.png';
import polkadotChainLogo from '../../assets/images/tech-logos/polkadot.png';
import avalancheChainLogo from '../../assets/images/tech-logos/avalanche.png';
import stellarChainLogo from '../../assets/images/tech-logos/stellar.png';
import csharpLogo from '../../assets/images/tech-logos/csharp.svg';
import dotnetLogo from '../../assets/images/tech-logos/dotnet.svg';
import htmlLogo from '../../assets/images/tech-logos/html.svg';
import cssLogo from '../../assets/images/tech-logos/css.svg';
import phpLogo from '../../assets/images/tech-logos/php.svg';
import androidLogo from '../../assets/images/tech-logos/android.svg';
import androidStudioLogo from '../../assets/images/tech-logos/androidstudio.svg';
import qtLogo from '../../assets/images/tech-logos/qt.svg';
import algorandLogo from '../../assets/images/tech-logos/algorand.png';
import minaLogo from '../../assets/images/tech-logos/mina.png';
import tonLogo from '../../assets/images/tech-logos/ton.png';
import chainlinkLogo from '../../assets/images/tech-logos/chainlink.png';
import celestiaLogo from '../../assets/images/tech-logos/celestia.png';
import monadLogo from '../../assets/images/tech-logos/monad.png';
import hyperliquidLogo from '../../assets/images/tech-logos/hyperliquid.png';
import scrollLogo from '../../assets/images/tech-logos/scroll.png';
import movementLogo from '../../assets/images/tech-logos/movement.png';
import unitsLogo from '../../assets/images/tech-logos/units.png';
import wormholeChainLogo from '../../assets/images/tech-logos/wormhole.png';
import jestLogo from '../../assets/images/tech-logos/jest.svg';

gsap.registerPlugin(ScrollTrigger);

// Maps a skill label (case/punctuation tolerant) to a transparent brand logo.
const TECH_LOGOS = {
    python: pythonLogo,
    r: rLogo,
    java: javaLogo,
    'c++': cplusplusLogo,
    cplusplus: cplusplusLogo,
    tensorflow: tensorflowLogo,
    pytorch: pytorchLogo,
    keras: kerasLogo,
    'scikit-learn': scikitlearnLogo,
    scikitlearn: scikitlearnLogo,
    sklearn: scikitlearnLogo,
    sql: sqlLogo,
    mysql: mysqlLogo,
    mongodb: mongodbLogo,
    cassandra: cassandraLogo,
    aws: awsLogo,
    'amazon web services': awsLogo,
    gcp: gcpLogo,
    'google cloud platform': gcpLogo,
    'google cloud platform (gcp)': gcpLogo,
    'google cloud': gcpLogo,
    azure: azureLogo,
    git: gitLogo,
    docker: dockerLogo,
    kubernetes: kubernetesLogo,
    k8s: kubernetesLogo,
    'apache spark': sparkLogo,
    spark: sparkLogo,
    typescript: typescriptLogo,
    ts: typescriptLogo,
    javascript: javascriptLogo,
    js: javascriptLogo,
    go: goLogo,
    golang: goLogo,
    rust: rustLogo,
    c: cLogo,
    bash: bashLogo,
    shell: bashLogo,
    solidity: solidityLogo,
    elixir: elixirLogo,
    haskell: haskellLogo,
    kotlin: kotlinLogo,
    swift: swiftLogo,
    scala: scalaLogo,
    erlang: erlangLogo,
    ruby: rubyLogo,
    ocaml: ocamlLogo,
    // Frameworks / runtimes
    'next.js': nextjsLogo,
    nextjs: nextjsLogo,
    react: reactLogo,
    'react native': reactLogo,
    vite: viteLogo,
    vitejs: viteLogo,
    'node.js': nodejsLogo,
    nodejs: nodejsLogo,
    node: nodejsLogo,
    express: expressLogo,
    'express.js': expressLogo,
    fastapi: fastapiLogo,
    redis: redisLogo,
    postgres: postgresLogo,
    postgresql: postgresLogo,
    graphql: graphqlLogo,
    tailwind: tailwindLogo,
    tailwindcss: tailwindLogo,
    'tailwind css': tailwindLogo,
    kafka: kafkaLogo,
    'apache kafka': kafkaLogo,
    linux: linuxLogo,
    nginx: nginxLogo,
    github: githubLogo,
    // Blockchain platforms
    ethereum: ethereumChainLogo,
    evm: ethereumChainLogo,
    solana: solanaChainLogo,
    aptos: aptosChainLogo,
    sui: suiChainLogo,
    cosmos: cosmosChainLogo,
    'cosmos sdk': cosmosChainLogo,
    polkadot: polkadotChainLogo,
    substrate: polkadotChainLogo,
    avalanche: avalancheChainLogo,
    avax: avalancheChainLogo,
    stellar: stellarChainLogo,
    soroban: stellarChainLogo,
    'c#': csharpLogo,
    csharp: csharpLogo,
    '.net': dotnetLogo,
    dotnet: dotnetLogo,
    html: htmlLogo,
    html5: htmlLogo,
    css: cssLogo,
    css3: cssLogo,
    php: phpLogo,
    android: androidLogo,
    'android (aosp)': androidLogo,
    aosp: androidLogo,
    'android studio': androidStudioLogo,
    qt: qtLogo,
    algorand: algorandLogo,
    mina: minaLogo,
    ton: tonLogo,
    'the open network': tonLogo,
    chainlink: chainlinkLogo,
    celestia: celestiaLogo,
    monad: monadLogo,
    hyperliquid: hyperliquidLogo,
    scroll: scrollLogo,
    movement: movementLogo,
    'movement labs': movementLogo,
    units: unitsLogo,
    'units network': unitsLogo,
    wormhole: wormholeChainLogo,
    jest: jestLogo,
};

const lookupTechLogo = (label) => TECH_LOGOS[label?.toLowerCase().trim()] ?? null;

// Per-category accent colors for the Technical Skills section.
const SKILL_CATEGORY_ACCENTS = {
    Languages:                  { ring: 'ring-sky-300/60',     dot: 'bg-sky-400',     glow: 'shadow-sky-300/30' },
    Frameworks:                 { ring: 'ring-amber-300/60',   dot: 'bg-amber-400',   glow: 'shadow-amber-300/30' },
    'Frameworks & Libraries':   { ring: 'ring-amber-300/60',   dot: 'bg-amber-400',   glow: 'shadow-amber-300/30' },
    Databases:                  { ring: 'ring-emerald-300/60', dot: 'bg-emerald-400', glow: 'shadow-emerald-300/30' },
    'Cloud Platforms':          { ring: 'ring-violet-300/60',  dot: 'bg-violet-400',  glow: 'shadow-violet-300/30' },
    'Other Tools':              { ring: 'ring-rose-300/60',    dot: 'bg-rose-400',    glow: 'shadow-rose-300/30' },
    Tools:                      { ring: 'ring-rose-300/60',    dot: 'bg-rose-400',    glow: 'shadow-rose-300/30' },
    'Blockchain Platforms':     { ring: 'ring-fuchsia-300/60', dot: 'bg-fuchsia-400', glow: 'shadow-fuchsia-300/30' },
    'Smart Contract Tooling':   { ring: 'ring-orange-300/60',  dot: 'bg-orange-400',  glow: 'shadow-orange-300/30' },
    'Android & Mobile':         { ring: 'ring-lime-300/60',    dot: 'bg-lime-400',    glow: 'shadow-lime-300/30' },
    'Operating Systems & Tooling': { ring: 'ring-teal-300/60', dot: 'bg-teal-400',    glow: 'shadow-teal-300/30' },
    Networking:                 { ring: 'ring-cyan-300/60',    dot: 'bg-cyan-400',    glow: 'shadow-cyan-300/30' },
};
const DEFAULT_ACCENT = { ring: 'ring-black/20', dot: 'bg-black', glow: 'shadow-black/20' };

function MemberProfile({ member, onClose }) {
    const [githubAccounts, setGithubAccounts] = useState([]); // Array of {username, data, repos, activity}
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        
        gsap.fromTo('.profile-overlay', 
            { opacity: 0 },
            { opacity: 1, duration: 0.4 }
        );
        
        gsap.fromTo('.profile-container', 
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, delay: 0.1 }
        );

        gsap.fromTo('.profile-section',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3 }
        );

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    useEffect(() => {
        const fetchGitHubData = async () => {
            if (!member.github) {
                setLoading(false);
                return;
            }

            // Support both single username (string) and multiple usernames (array)
            const githubUsernames = Array.isArray(member.github) ? member.github : [member.github];

            try {
                const accountsData = await Promise.all(
                    githubUsernames.map(async (username) => {
                        try {
                            // Fetch user data
                            const userResponse = await fetch(`https://api.github.com/users/${username}`);
                            const userData = await userResponse.json();

                            // Fetch all repos to get star counts
                            const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
                            let reposData = await reposResponse.json();

                            // Fetch featured repos if specified (only for first account)
                            let featuredRepos = [];
                            if (username === githubUsernames[0] && member.featuredRepos && member.featuredRepos.length > 0) {
                                const featuredPromises = member.featuredRepos.map(repoFullName =>
                                    fetch(`https://api.github.com/repos/${repoFullName}`)
                                        .then(res => res.json())
                                        .catch(err => {
                                            console.error(`Error fetching ${repoFullName}:`, err);
                                            return null;
                                        })
                                );
                                const featuredResults = await Promise.all(featuredPromises);
                                featuredRepos = featuredResults.filter(repo => repo !== null);
                            }

                            // Sort repos by stars (descending)
                            const sortedRepos = reposData.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));

                            // Combine: featured repos first, then top starred repos (avoiding duplicates)
                            const featuredRepoIds = new Set(featuredRepos.map(r => r.id));
                            const otherTopRepos = sortedRepos.filter(r => !featuredRepoIds.has(r.id)).slice(0, 6 - featuredRepos.length);
                            const finalRepos = [...featuredRepos, ...otherTopRepos].slice(0, 6);

                            // Fetch activity
                            let eventsData = [];
                            try {
                                const eventsResponse = await fetch(`https://api.github.com/users/${username}/events/public?per_page=10`);
                                const eventsJson = await eventsResponse.json();
                                eventsData = Array.isArray(eventsJson) ? eventsJson : [];
                            } catch (e) {
                                console.error(`Error fetching events for ${username}:`, e);
                            }

                            return {
                                username,
                                data: userData || {},
                                repos: finalRepos || [],
                                activity: eventsData
                            };
                        } catch (error) {
                            console.error(`Error fetching GitHub data for ${username}:`, error);
                            return null;
                        }
                    })
                );

                setGithubAccounts(accountsData.filter(account => account !== null));
                setLoading(false);
            } catch (error) {
                console.error('GitHub API Error:', error);
                setLoading(false);
            }
        };

        fetchGitHubData();
    }, [member.github, member.featuredRepos]);

    const handleClose = () => {
        gsap.to('.profile-overlay', {
            opacity: 0,
            duration: 0.3,
            onComplete: onClose
        });
    };

    const getActivityIcon = (type) => {
        switch(type) {
            case 'PushEvent': return '📝';
            case 'CreateEvent': return '✨';
            case 'PullRequestEvent': return '🔀';
            case 'IssuesEvent': return '🐛';
            case 'WatchEvent': return '⭐';
            case 'ForkEvent': return '🍴';
            default: return '💻';
        }
    };

    const getActivityText = (event) => {
        switch(event.type) {
            case 'PushEvent':
                return `Pushed ${event.payload.commits?.length || 0} commits to ${event.repo.name}`;
            case 'CreateEvent':
                return `Created ${event.payload.ref_type} in ${event.repo.name}`;
            case 'PullRequestEvent':
                return `${event.payload.action} pull request in ${event.repo.name}`;
            case 'IssuesEvent':
                return `${event.payload.action} issue in ${event.repo.name}`;
            case 'WatchEvent':
                return `Starred ${event.repo.name}`;
            case 'ForkEvent':
                return `Forked ${event.repo.name}`;
            default:
                return `Activity in ${event.repo.name}`;
        }
    };

    return (
        <div className="profile-overlay fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4 overflow-y-auto">
            <div className="profile-container bg-white w-full max-w-7xl max-h-[95vh] overflow-y-auto rounded-2xl relative my-8">
                <button
                    onClick={handleClose}
                    className="sticky top-4 right-4 float-right z-10 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 font-bold text-3xl shadow-lg"
                >
                    ×
                </button>

                <div className="px-6 sm:px-12 pt-20 pb-12">
                    <div className="profile-section grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-1">
                            <div className="sticky top-8">
                                <div className="relative w-full aspect-square rounded-full overflow-hidden border-4 border-black shadow-2xl mb-6">
                                    {member.img ? (
                                        <img src={member.img} alt={member.title} className="w-full h-full object-cover object-center" />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-white to-[#d4d4d4] flex items-center justify-center">
                                            <span className="text-6xl font-[Funnel] font-bold text-[#3d3a2f]">
                                                {member.title.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                            </span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                </div>
                                <h1 className="font-[Funnel] font-bold text-4xl sm:text-5xl mb-3">{member.title}</h1>
                                <p className="font-[Funnel] text-xl sm:text-2xl text-white bg-black px-4 py-2 rounded-full inline-block mb-4">
                                    {member.role}
                                </p>
                                <div className="space-y-3 text-gray-700 font-[Funnel]">
                                    <p className="flex items-center gap-2">
                                        <span className="text-2xl">📍</span>
                                        <span>{member.location}</span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="text-2xl">🎓</span>
                                        <span className="text-sm">{member.education}</span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="text-2xl">🌐</span>
                                        <span>{member.languages.join(', ')}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-2 space-y-8">
                            <div className="profile-section">
                                <h2 className="font-[Funnel] font-bold text-3xl sm:text-4xl mb-4 border-b-4 border-black pb-2">About</h2>
                                <p className="font-[Funnel] text-lg text-gray-700 leading-relaxed mb-6">{member.bio}</p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                    {member.achievements.map((achievement, index) => (
                                        <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg border-2 border-black">
                                            <span className="text-2xl">🏆</span>
                                            <p className="font-[Funnel] text-sm">{achievement}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="profile-section">
                                <h2 className="font-[Funnel] font-bold text-3xl sm:text-4xl mb-4 border-b-4 border-black pb-2">Expertise</h2>
                                <div className="flex flex-wrap gap-3">
                                    {member.expertise.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="font-[Funnel] text-sm bg-black text-white px-4 py-2 rounded-full border-2 border-black hover:bg-white hover:text-black transition-all duration-300 cursor-default"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {member.technicalSkills && Object.keys(member.technicalSkills).length > 0 && (
                                <div className="profile-section">
                                    <h2 className="font-[Funnel] font-bold text-3xl sm:text-4xl mb-6 border-b-4 border-black pb-2">Technical Skills</h2>
                                    <div className="space-y-6">
                                        {Object.entries(member.technicalSkills).map(([category, items]) => {
                                            const accent = SKILL_CATEGORY_ACCENTS[category] ?? DEFAULT_ACCENT;
                                            return (
                                                <div key={category}>
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <span className={`w-2 h-2 rounded-full ${accent.dot}`}></span>
                                                        <h3 className="font-[Funnel] font-bold text-xs uppercase tracking-[0.25em] text-black">{category}</h3>
                                                        <span className="flex-1 h-px bg-black/15"></span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2.5">
                                                        {items.map((item, i) => {
                                                            const logo = lookupTechLogo(item);
                                                            return (
                                                                <div
                                                                    key={i}
                                                                    className={`group relative flex items-center gap-2 px-3 py-2
                                                                        bg-black/5 backdrop-blur-sm
                                                                        rounded-xl ring-1 ring-inset ${accent.ring}
                                                                        transition-all duration-300 cursor-default
                                                                        hover:bg-black/10 hover:-translate-y-0.5 hover:scale-[1.03]
                                                                        hover:shadow-lg ${accent.glow}`}
                                                                >
                                                                    {logo && (
                                                                        <img
                                                                            src={logo}
                                                                            alt={`${item} logo`}
                                                                            className="w-5 h-5 sm:w-6 sm:h-6 object-contain transition-transform duration-300 group-hover:scale-110"
                                                                            loading="lazy"
                                                                        />
                                                                    )}
                                                                    <span className="font-[Funnel] text-xs sm:text-sm font-medium text-black whitespace-nowrap">
                                                                        {item}
                                                                    </span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {!loading && githubAccounts.length > 0 && (
                                <div className="profile-section">
                                    <h2 className="font-[Funnel] font-bold text-3xl sm:text-4xl mb-4 border-b-4 border-black pb-2">Key Projects</h2>
                                    <div className="space-y-4">
                                        {githubAccounts.map((account) =>
                                            account.repos.slice(0, 6).map((repo) => (
                                                <a
                                                    key={repo.id}
                                                    href={repo.html_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block border-2 border-black rounded-lg p-5 hover:shadow-xl transition-all duration-300 bg-white hover:bg-black/5"
                                                >
                                                    <div className="flex items-start justify-between mb-2">
                                                        <h3 className="font-[Funnel] font-bold text-xl flex-1">{repo.name}</h3>
                                                        <div className="flex items-center gap-3 ml-4">
                                                            {repo.stargazers_count > 0 && (
                                                                <span className="font-[Funnel] text-sm text-gray-600 flex items-center gap-1">
                                                                    ⭐ {repo.stargazers_count}
                                                                </span>
                                                            )}
                                                            {repo.forks_count > 0 && (
                                                                <span className="font-[Funnel] text-sm text-gray-600 flex items-center gap-1">
                                                                    🔱 {repo.forks_count}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {repo.description && (
                                                        <p className="font-[Funnel] text-sm text-gray-700 mb-3">{repo.description}</p>
                                                    )}
                                                    <div className="flex flex-wrap gap-2">
                                                        {repo.language && (
                                                            <span className="font-[Funnel] text-xs bg-white text-black px-3 py-1 rounded-full border border-black">
                                                                {repo.language}
                                                            </span>
                                                        )}
                                                        {repo.topics && repo.topics.slice(0, 4).map((topic, topicIndex) => (
                                                            <span
                                                                key={topicIndex}
                                                                className="font-[Funnel] text-xs bg-white text-black px-3 py-1 rounded-full border border-black"
                                                            >
                                                                {topic}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </a>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}

                            {loading && (
                                <div className="profile-section">
                                    <h2 className="font-[Funnel] font-bold text-3xl sm:text-4xl mb-4 border-b-4 border-black pb-2">GitHub Activity</h2>
                                    <div className="flex items-center justify-center py-12">
                                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-black/10 border-t-black"></div>
                                    </div>
                                </div>
                            )}

                            {!loading && githubAccounts.map((account, accountIndex) => (
                                <div key={account.username} className="profile-section">
                                    <h2 className="font-[Funnel] font-bold text-3xl sm:text-4xl mb-4 border-b-4 border-black pb-2 flex items-center gap-3">
                                        <span>GitHub Activity - @{account.username}</span>
                                        <a
                                            href={`https://github.com/${account.username}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xl hover:scale-110 transition-transform"
                                        >
                                            🔗
                                        </a>
                                    </h2>

                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                                        <div className="bg-white p-4 rounded-lg border-2 border-black text-center">
                                            <p className="font-[Funnel] font-bold text-3xl">{account.data?.public_repos || 0}</p>
                                            <p className="font-[Funnel] text-sm text-gray-700">Repositories</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border-2 border-black text-center">
                                            <p className="font-[Funnel] font-bold text-3xl">{account.data?.followers || 0}</p>
                                            <p className="font-[Funnel] text-sm text-gray-700">Followers</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border-2 border-black text-center">
                                            <p className="font-[Funnel] font-bold text-3xl">{account.data?.following || 0}</p>
                                            <p className="font-[Funnel] text-sm text-gray-700">Following</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border-2 border-black text-center">
                                            <p className="font-[Funnel] font-bold text-3xl">{account.data?.public_gists || 0}</p>
                                            <p className="font-[Funnel] text-sm text-gray-700">Gists</p>
                                        </div>
                                    </div>

                                    {account.username && (
                                        <div className="mb-6">
                                            <h3 className="font-[Funnel] font-bold text-2xl mb-4">Contribution Activity</h3>
                                            <div className="bg-white p-6 rounded-lg border-2 border-black overflow-x-auto">
                                                <GitHubCalendar
                                                    username={account.username}
                                                    blockSize={12}
                                                    blockMargin={4}
                                                    fontSize={14}
                                                    colorScheme="light"
                                                    theme={{
                                                        light: ['#f0f0f0', '#d4d4d4', '#a3a3a3', '#525252', '#171717'],
                                                        dark: ['#f0f0f0', '#d4d4d4', '#a3a3a3', '#525252', '#171717']
                                                    }}
                                                    style={{
                                                        fontFamily: 'Funnel, sans-serif'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {account.repos && account.repos.length > 0 && (
                                        <div className="mb-6">
                                            <h3 className="font-[Funnel] font-bold text-2xl mb-4">
                                                {accountIndex === 0 && member.featuredRepos ? 'Featured & Top Repositories' : 'Top Repositories'}
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {account.repos.slice(0, 6).map((repo, index) => {
                                                    const isFeatured = member.featuredRepos?.includes(repo.full_name);
                                                    return (
                                                        <a
                                                            key={index}
                                                            href={repo.html_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={`border-2 rounded-lg p-4 hover:shadow-xl hover:scale-105 transition-all duration-300 relative ${
                                                                isFeatured
                                                                    ? 'border-black bg-white shadow-lg'
                                                                    : 'border-black bg-white'
                                                            }`}
                                                        >
                                                            {isFeatured && (
                                                                <div className="absolute -top-2 -right-2 bg-black text-white px-3 py-1 rounded-full text-xs font-[Funnel] font-bold shadow-lg">
                                                                    ⭐ FEATURED
                                                                </div>
                                                            )}
                                                            <h4 className="font-[Funnel] font-bold text-lg mb-2 truncate pr-16">{repo.name}</h4>
                                                            <p className="font-[Funnel] text-sm text-gray-600 mb-3 line-clamp-2">
                                                                {repo.description || 'No description'}
                                                            </p>
                                                            <div className="flex items-center gap-4 text-sm">
                                                                {repo.language && (
                                                                    <span className="flex items-center gap-1 text-gray-600">
                                                                        <span className="w-3 h-3 rounded-full bg-black"></span>
                                                                        {repo.language}
                                                                    </span>
                                                                )}
                                                                <span className="flex items-center gap-1 font-[Funnel] font-bold text-black">
                                                                    ⭐ {repo.stargazers_count || 0}
                                                                </span>
                                                                <span className="flex items-center gap-1 text-gray-600">
                                                                    🍴 {repo.forks_count || 0}
                                                                </span>
                                                            </div>
                                                        </a>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {account.activity && account.activity.length > 0 && (
                                        <div>
                                            <h3 className="font-[Funnel] font-bold text-2xl mb-4">Recent Activity</h3>
                                            <div className="space-y-3">
                                                {account.activity.slice(0, 8).map((event, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-black transition-all duration-300"
                                                    >
                                                        <span className="text-2xl">{getActivityIcon(event.type)}</span>
                                                        <div className="flex-1">
                                                            <p className="font-[Funnel] text-sm">{getActivityText(event)}</p>
                                                            <p className="font-[Funnel] text-xs text-gray-500 mt-1">
                                                                {new Date(event.created_at).toLocaleDateString('en-US', {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                })}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Spotify Player */}
            <SpotifyPlayer spotifyTrackId={member.spotifyTrackId} />
        </div>
    );
}

MemberProfile.propTypes = {
    member: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
};

export default MemberProfile;


