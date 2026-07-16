import { useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsData } from '../data/projectsData';
import ProjectMark from '../components/ProjectMark';

gsap.registerPlugin(ScrollTrigger);

function ProjectDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const containerRef = useRef(null);
    
    const project = projectsData.find(p => p.id === parseInt(id));
    const projectIndex = projectsData.findIndex(p => p.id === parseInt(id));
    const prevProject = projectIndex > 0 ? projectsData[projectIndex - 1] : null;
    const nextProject = projectIndex < projectsData.length - 1 ? projectsData[projectIndex + 1] : null;

    useEffect(() => {
        document.body.setAttribute("theme", "white");
        window.scrollTo(0, 0);

        gsap.fromTo('.detail-header', 
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );

        gsap.fromTo('.detail-content > *',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.3 }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [id]);

    if (!project) {
        return (
            <div className="min-h-screen bg-[var(--light)] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-[Funnel] font-bold text-4xl mb-4">Project Not Found</h1>
                    <Link to="/projects" className="font-[Funnel] text-lg text-blue-600 hover:underline">
                        ← Back to Projects
                    </Link>
                </div>
            </div>
        );
    }

    const statusColor = {
        'Launched': 'bg-green-500',
        'Completed': 'bg-green-500',
        'Testnet': 'bg-blue-500',
        'Demo': 'bg-blue-500',
        'Active': 'bg-emerald-500',
        'Development': 'bg-yellow-500',
        'Concept': 'bg-gray-500'
    };

    const priorityColor = {
        'S': 'bg-purple-600',
        'A': 'bg-red-500',
        'B': 'bg-orange-500',
        'C': 'bg-gray-500'
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-[var(--light)] pb-20">
            {/* Header */}
            <div className="detail-header bg-black text-white">
                <div className="max-w-6xl mx-auto px-6 sm:px-8 pt-12 pb-14">
                    <button
                        onClick={() => navigate('/projects')}
                        className="flex items-center gap-2 text-white/80 hover:text-white hover:-translate-x-1 transition-all font-[Funnel] text-base mb-12"
                    >
                        <span className="text-xl leading-none">←</span>
                        <span>Back to Projects</span>
                    </button>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-8">
                        <div className="bg-white rounded-[28px] p-1.5 w-fit shrink-0">
                            <ProjectMark
                                project={project}
                                className="w-28 h-28 md:w-32 md:h-32 rounded-[22px]"
                                textClass="text-6xl"
                            />
                        </div>
                        <div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className={`font-[Funnel] px-4 py-1 rounded-full text-sm text-white ${statusColor[project.status] || 'bg-gray-500'}`}>
                                    {project.status}
                                </span>
                                <span className="font-[Funnel] px-4 py-1 rounded-full text-sm bg-white text-black">
                                    {project.category}
                                </span>
                                {project.priority && (
                                    <span className={`font-[Funnel] px-4 py-1 rounded-full text-sm text-white ${priorityColor[project.priority] || 'bg-gray-500'}`}>
                                        Priority {project.priority}
                                    </span>
                                )}
                            </div>
                            <h1 className="font-[Funnel] font-bold text-4xl md:text-6xl mb-3">{project.title}</h1>
                            <p className="font-[Funnel] text-xl md:text-2xl text-gray-300 leading-relaxed">{project.subtitle}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="detail-content max-w-6xl mx-auto px-8 py-12">
                {/* Progress Bar */}
                {project.progress !== undefined && (
                    <div className="mb-10 p-6 bg-white rounded-2xl border-2 border-black">
                        <div className="flex justify-between items-center mb-3">
                            <span className="font-[Funnel] font-bold text-xl">Project Progress</span>
                            <span className="font-[Funnel] font-bold text-2xl">{project.progress}%</span>
                        </div>
                        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-black to-gray-700 rounded-full transition-all duration-1000"
                                style={{ width: `${project.progress}%` }}
                            />
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <div className="bg-white p-8 rounded-2xl border-2 border-black">
                            <h2 className="font-[Funnel] font-bold text-2xl mb-4">About</h2>
                            <p className="font-[Funnel] text-lg text-gray-700 leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        {/* Features */}
                        {project.features && project.features.length > 0 && (
                            <div className="bg-white p-8 rounded-2xl border-2 border-black">
                                <h2 className="font-[Funnel] font-bold text-2xl mb-4">Key Features</h2>
                                <ul className="space-y-3">
                                    {project.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="text-green-500 text-xl mt-1">✓</span>
                                            <span className="font-[Funnel] text-lg text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Tech Stack */}
                        {project.tech && project.tech.length > 0 && (
                            <div className="bg-white p-8 rounded-2xl border-2 border-black">
                                <h2 className="font-[Funnel] font-bold text-2xl mb-4">Tech Stack</h2>
                                <div className="flex flex-wrap gap-3">
                                    {project.tech.map((tech, i) => (
                                        <span key={i} className="font-[Funnel] px-4 py-2 bg-gray-100 rounded-full text-lg border border-gray-300">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Team */}
                        {project.team && project.team.length > 0 && (
                            <div className="bg-white p-6 rounded-2xl border-2 border-black">
                                <h3 className="font-[Funnel] font-bold text-xl mb-4">Team</h3>
                                <ul className="space-y-2">
                                    {project.team.map((member, i) => (
                                        <li key={i} className="font-[Funnel] text-gray-700 flex items-center gap-2">
                                            <span className="w-2 h-2 bg-black rounded-full"></span>
                                            {member}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Metrics */}
                        {project.metrics && (
                            <div className="bg-white p-6 rounded-2xl border-2 border-black">
                                <h3 className="font-[Funnel] font-bold text-xl mb-4">Metrics</h3>
                                <div className="space-y-3">
                                    {Object.entries(project.metrics).map(([key, value], i) => {
                                        const longValue = typeof value === 'string' && value.length > 18;
                                        return (
                                            <div key={i} className="flex justify-between items-start gap-3">
                                                <span className="font-[Funnel] text-gray-600 capitalize shrink-0 whitespace-nowrap">
                                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                                </span>
                                                <span
                                                    className={`text-right min-w-0 break-all ${longValue ? 'font-mono text-[11px] sm:text-xs leading-snug' : 'font-[Funnel] font-bold text-sm sm:text-base'}`}
                                                >
                                                    {value}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Budget & Duration */}
                        {(project.budget || project.duration) && (
                            <div className="bg-white p-6 rounded-2xl border-2 border-black">
                                <h3 className="font-[Funnel] font-bold text-xl mb-4">Project Info</h3>
                                <div className="space-y-3">
                                    {project.budget && (
                                        <div className="flex justify-between items-center">
                                            <span className="font-[Funnel] text-gray-600">Budget</span>
                                            <span className="font-[Funnel] font-bold">{project.budget}</span>
                                        </div>
                                    )}
                                    {project.duration && (
                                        <div className="flex justify-between items-center">
                                            <span className="font-[Funnel] text-gray-600">Duration</span>
                                            <span className="font-[Funnel] font-bold">{project.duration}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Links */}
                        {project.links && Object.keys(project.links).length > 0 && (
                            <div className="bg-black p-6 rounded-2xl">
                                <h3 className="font-[Funnel] font-bold text-xl mb-4 text-white">Links</h3>
                                <div className="space-y-3">
                                    {Object.entries(project.links).map(([key, url], i) => (
                                        <a
                                            key={i}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between font-[Funnel] text-white hover:opacity-70 transition-colors"
                                        >
                                            <span className="capitalize">{key}</span>
                                            <span>→</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation */}
                <div className="mt-16 pt-8 border-t-2 border-gray-200">
                    <div className="flex justify-between items-center">
                        {prevProject ? (
                            <Link
                                to={`/projects/${prevProject.id}`}
                                className="group flex items-center gap-3 hover:opacity-70 transition-opacity"
                            >
                                <span className="text-3xl group-hover:-translate-x-2 transition-transform">←</span>
                                <div>
                                    <p className="font-[Funnel] text-sm text-gray-500">Previous</p>
                                    <p className="font-[Funnel] font-bold text-lg">{prevProject.title}</p>
                                </div>
                            </Link>
                        ) : <div />}

                        {nextProject ? (
                            <Link
                                to={`/projects/${nextProject.id}`}
                                className="group flex items-center gap-3 hover:opacity-70 transition-opacity text-right"
                            >
                                <div>
                                    <p className="font-[Funnel] text-sm text-gray-500">Next</p>
                                    <p className="font-[Funnel] font-bold text-lg">{nextProject.title}</p>
                                </div>
                                <span className="text-3xl group-hover:translate-x-2 transition-transform">→</span>
                            </Link>
                        ) : <div />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectDetailPage;

