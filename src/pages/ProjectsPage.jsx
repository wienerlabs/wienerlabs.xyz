import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LuSearch, LuGlobe, LuGithub, LuArrowUpRight } from "react-icons/lu";
import { projectsData, categories } from '../data/projectsData';
import ProjectMark from '../components/ProjectMark';

gsap.registerPlugin(ScrollTrigger);

const sortOptions = [
    { value: 'default', label: 'Featured' },
    { value: 'title', label: 'Name (A to Z)' },
    { value: 'priority', label: 'Priority' },
];

function ProjectsPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("default");
    const containerRef = useRef(null);
    const navigate = useNavigate();

    const categoryCounts = useMemo(() => {
        const counts = { All: projectsData.length };
        projectsData.forEach(p => {
            counts[p.category] = (counts[p.category] || 0) + 1;
        });
        return counts;
    }, []);

    const sortProjects = (projects) => {
        const sorted = [...projects];

        const withCustomImage = sorted.filter(p => p.hasCustomImage);
        const withoutCustomImage = sorted.filter(p => !p.hasCustomImage);

        const sortFn = (a, b) => {
            switch (sortBy) {
                case 'title':
                    return a.title.localeCompare(b.title);
                case 'priority': {
                    const priorityOrder = { 'S': 1, 'A': 2, 'B': 3, 'C': 4 };
                    return (priorityOrder[a.priority] || 99) - (priorityOrder[b.priority] || 99);
                }
                default:
                    return 0;
            }
        };

        if (sortBy === 'default') {
            return [...withCustomImage, ...withoutCustomImage];
        }
        return [...withCustomImage.sort(sortFn), ...withoutCustomImage.sort(sortFn)];
    };

    const filteredProjects = sortProjects(projectsData.filter(p => {
        const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
        const matchesSearch = searchQuery === "" ||
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    }));

    useEffect(() => {
        document.body.setAttribute("theme", "white");

        gsap.fromTo('.page-header',
            { y: -40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
        );

        gsap.fromTo('.category-btn',
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: { amount: 0.35 }, delay: 0.15, ease: "power2.out" }
        );

        gsap.fromTo('.project-card',
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, stagger: { amount: 0.6 }, delay: 0.25, ease: "power3.out" }
        );
    }, []);

    useEffect(() => {
        gsap.fromTo('.project-card',
            { y: 24, opacity: 0, scale: 0.98 },
            { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: { amount: 0.4 }, ease: "power2.out" }
        );
    }, [selectedCategory, sortBy]);

    const handleBackClick = () => {
        gsap.to('.projects-container', {
            opacity: 0,
            y: -20,
            duration: 0.3,
            onComplete: () => navigate('/')
        });
    };

    return (
        <div ref={containerRef} className="projects-container min-h-screen bg-[var(--light)] pb-24">
            {/* Header */}
            <div className="page-header bg-black text-white pt-14 pb-16 px-6 sm:px-8">
                <div className="max-w-7xl mx-auto">
                    <button
                        onClick={handleBackClick}
                        className="flex items-center gap-2 text-white/80 hover:text-white hover:-translate-x-1 transition-all mb-10 font-[Funnel] text-base"
                    >
                        <span className="text-xl leading-none">←</span>
                        <span>Back to Home</span>
                    </button>
                    <div className="flex flex-wrap items-end justify-between gap-6">
                        <div>
                            <h1 className="font-[Funnel] font-bold text-5xl sm:text-7xl leading-none mb-4">Our Projects</h1>
                            <p className="font-[Funnel] text-lg sm:text-xl text-gray-400 max-w-2xl leading-relaxed">
                                Blockchain, tokenization, and AI systems built and shipped by Wiener Labs.
                            </p>
                        </div>
                        <div className="flex items-baseline gap-2 border border-white/25 rounded-2xl px-5 py-3">
                            <span className="font-[Funnel] font-bold text-4xl leading-none">{projectsData.length}</span>
                            <span className="font-[Funnel] text-sm text-gray-400">projects launched</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-10 pb-2">
                <div className="flex flex-col md:flex-row gap-4 md:items-center mb-8">
                    <div className="relative flex-1">
                        <LuSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search by name, subtitle, or description"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-13 pr-12 py-4 font-[Funnel] text-base border-2 border-black rounded-2xl
                                focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow
                                bg-white placeholder-gray-400"
                            style={{ paddingLeft: '3.25rem' }}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 bg-black text-white rounded-full
                                    flex items-center justify-center hover:opacity-70 transition-opacity text-sm"
                            >
                                ×
                            </button>
                        )}
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        <span className="font-[Funnel] text-sm text-gray-500">Sort by</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="font-[Funnel] px-4 py-4 border-2 border-black rounded-2xl bg-white cursor-pointer
                                focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                        >
                            {sortOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    {categories.filter(c => categoryCounts[c]).map((category, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedCategory(category)}
                            className={`category-btn font-[Funnel] pl-4 pr-2.5 py-2 rounded-full border-2 border-black transition-all duration-200 text-sm flex items-center gap-2
                                ${selectedCategory === category
                                    ? 'bg-black text-white'
                                    : 'bg-white text-black hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                                }`}
                        >
                            {category}
                            <span className={`text-xs px-1.5 py-0.5 rounded-full leading-none
                                ${selectedCategory === category ? 'bg-white text-black' : 'bg-black text-white'}`}>
                                {categoryCounts[category]}
                            </span>
                        </button>
                    ))}
                </div>

                <p className="font-[Funnel] text-sm text-gray-500 mb-8">
                    Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
                    {selectedCategory !== "All" && <span> in <span className="text-black font-semibold">{selectedCategory}</span></span>}
                    {searchQuery && <span> for &quot;<span className="text-black font-semibold">{searchQuery}</span>&quot;</span>}
                </p>
            </div>

            {/* Projects Grid */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
                {filteredProjects.length === 0 ? (
                    <div className="text-center py-24 border-2 border-dashed border-gray-300 rounded-3xl">
                        <LuSearch className="text-5xl mx-auto mb-5 text-gray-300" />
                        <h3 className="font-[Funnel] font-bold text-2xl mb-2">No projects found</h3>
                        <p className="font-[Funnel] text-gray-500 mb-7">
                            Try a different keyword or clear the active filters.
                        </p>
                        <button
                            onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                            className="font-[Funnel] px-6 py-3 bg-black text-white rounded-full hover:opacity-80 transition-opacity"
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project) => (
                            <Link
                                key={project.id}
                                to={`/projects/${project.id}`}
                                className="project-card group bg-white rounded-3xl border-2 border-black p-6 flex flex-col gap-5
                                    transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <ProjectMark
                                        project={project}
                                        className="w-16 h-16 rounded-2xl border-2 border-black shrink-0
                                            transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3"
                                        textClass="text-2xl"
                                    />
                                    <div className="flex flex-wrap justify-end gap-1.5">
                                        <span className="font-[Funnel] px-3 py-1 rounded-full text-xs bg-black text-white">
                                            {project.status}
                                        </span>
                                        <span className="font-[Funnel] px-3 py-1 rounded-full text-xs bg-white text-black border border-black">
                                            {project.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-[Funnel] font-bold text-2xl leading-tight mb-1.5 flex items-center gap-2">
                                        <span className="line-clamp-1">{project.title}</span>
                                        <LuArrowUpRight className="text-xl shrink-0 opacity-0 -translate-x-1 translate-y-1
                                            group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                                    </h3>
                                    <p className="font-[Funnel] text-gray-600 text-sm leading-relaxed line-clamp-2">
                                        {project.subtitle}
                                    </p>
                                </div>

                                {project.tech && (
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.tech.slice(0, 3).map((t, i) => (
                                            <span key={i} className="font-[Funnel] text-xs px-2.5 py-1 bg-gray-100 rounded-full">
                                                {t}
                                            </span>
                                        ))}
                                        {project.tech.length > 3 && (
                                            <span className="font-[Funnel] text-xs px-2.5 py-1 bg-gray-100 rounded-full">
                                                +{project.tech.length - 3}
                                            </span>
                                        )}
                                    </div>
                                )}

                                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                    <div className="flex items-center gap-4">
                                        {project.links?.website && (
                                            <span className="font-[Funnel] text-xs flex items-center gap-1.5 text-gray-600">
                                                <LuGlobe className="text-sm" /> Website
                                            </span>
                                        )}
                                        {project.links?.github && (
                                            <span className="font-[Funnel] text-xs flex items-center gap-1.5 text-gray-600">
                                                <LuGithub className="text-sm" /> GitHub
                                            </span>
                                        )}
                                        {!project.links?.website && !project.links?.github && project.priority && (
                                            <span className="font-[Funnel] text-xs text-gray-400">
                                                Priority {project.priority}
                                            </span>
                                        )}
                                    </div>
                                    <span className="font-[Funnel] font-bold text-sm">{project.progress}%</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProjectsPage;
