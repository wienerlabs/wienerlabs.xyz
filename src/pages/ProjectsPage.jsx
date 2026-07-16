import { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsData, categories } from '../data/projectsData';

gsap.registerPlugin(ScrollTrigger);

const sortOptions = [
    { value: 'progress-desc', label: 'Progress (High to Low)' },
    { value: 'progress-asc', label: 'Progress (Low to High)' },
    { value: 'status', label: 'Status' },
    { value: 'priority', label: 'Priority' },
];

function ProjectsPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("progress-desc");
    const containerRef = useRef(null);
    const navigate = useNavigate();

    const sortProjects = (projects) => {
        const sorted = [...projects];

        // First: separate projects with custom images
        const withCustomImage = sorted.filter(p => p.hasCustomImage);
        const withoutCustomImage = sorted.filter(p => !p.hasCustomImage);

        const sortFn = (a, b) => {
            switch (sortBy) {
                case 'progress-desc':
                    return (b.progress || 0) - (a.progress || 0);
                case 'progress-asc':
                    return (a.progress || 0) - (b.progress || 0);
                case 'status':
                    const statusOrder = { 'Launched': 1, 'Completed': 2, 'Testnet': 3, 'Demo': 4, 'Active': 5, 'Development': 6, 'Concept': 7 };
                    return (statusOrder[a.status] || 99) - (statusOrder[b.status] || 99);
                case 'priority':
                    const priorityOrder = { 'S': 1, 'A': 2, 'B': 3, 'C': 4 };
                    return (priorityOrder[a.priority] || 99) - (priorityOrder[b.priority] || 99);
                default:
                    return 0;
            }
        };

        // Sort each group, then combine (custom image projects first)
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
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );

        gsap.fromTo('.category-btn',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3 }
        );

        gsap.fromTo('.project-card',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, delay: 0.5 }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    useEffect(() => {
        gsap.fromTo('.project-card',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.1 }
        );
    }, [selectedCategory]);

    const handleBackClick = () => {
        gsap.to('.projects-container', {
            opacity: 0,
            y: -20,
            duration: 0.3,
            onComplete: () => navigate('/')
        });
    };

    return (
        <div ref={containerRef} className="projects-container min-h-screen bg-[var(--light)] pb-20">
            {/* Header */}
            <div className="page-header bg-black text-white py-20 px-8">
                <div className="max-w-7xl mx-auto">
                    <button 
                        onClick={handleBackClick}
                        className="flex items-center gap-2 text-white hover:opacity-70 transition-opacity mb-8 font-[Sansita] text-lg"
                    >
                        <span className="text-2xl">←</span>
                        <span>Back to Home</span>
                    </button>
                    <h1 className="font-[SansitaBold] text-5xl sm:text-7xl mb-4">Our Projects</h1>
                    <p className="font-[Sansita] text-xl sm:text-2xl text-gray-300 max-w-2xl">
                        Discover our cutting-edge blockchain and tokenization solutions across DeFi, infrastructure, and AI.
                    </p>
                </div>
            </div>

            {/* Search & Category Filter */}
            <div className="max-w-7xl mx-auto px-8 py-10">
                {/* Search Bar */}
                <div className="mb-8 max-w-xl mx-auto">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-6 py-4 pr-12 font-[Sansita] text-lg border-2 border-black rounded-full
                                focus:outline-none focus:ring-2 focus:ring-white focus:border-black
                                bg-white placeholder-gray-500"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">
                            🔍
                        </span>
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-12 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-300 rounded-full
                                    flex items-center justify-center hover:bg-gray-400 transition-colors text-sm"
                            >
                                ×
                            </button>
                        )}
                    </div>
                </div>

                {/* Category Buttons */}
                <div className="flex flex-wrap gap-3 justify-center">
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedCategory(category)}
                            className={`category-btn font-[Sansita] px-5 py-2 rounded-full border-2 border-black transition-all duration-300 text-base
                                ${selectedCategory === category
                                    ? 'bg-black text-white'
                                    : 'bg-white text-black hover:bg-black hover:text-white'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Sort Dropdown */}
                <div className="flex justify-center mt-6">
                    <div className="flex items-center gap-3">
                        <span className="font-[Sansita] text-gray-600">Sort by:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="font-[Sansita] px-4 py-2 border-2 border-black rounded-full bg-white
                                focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
                        >
                            {sortOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="max-w-7xl mx-auto px-8">
                <p className="font-[Sansita] text-gray-600 mb-6 text-center">
                    Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
                    {searchQuery && <span className="text-black font-medium"> for "{searchQuery}"</span>}
                </p>

                {filteredProjects.length === 0 ? (
                    <div className="text-center py-20">
                        <span className="text-6xl mb-4 block">🔍</span>
                        <h3 className="font-[SansitaBold] text-2xl mb-2">No projects found</h3>
                        <p className="font-[Sansita] text-gray-600 mb-6">
                            Try adjusting your search or filter criteria
                        </p>
                        <button
                            onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                            className="font-[Sansita] px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project) => (
                            <Link
                                key={project.id}
                                to={`/projects/${project.id}`}
                                className="project-card bg-white rounded-2xl overflow-hidden border-2 border-black
                                    hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group block"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className={`font-[Sansita] px-3 py-1 rounded-full text-sm
                                            ${project.status === 'Launched' || project.status === 'Completed' ? 'bg-green-500 text-white' :
                                              project.status === 'Testnet' || project.status === 'Demo' ? 'bg-blue-500 text-white' :
                                              project.status === 'Active' ? 'bg-emerald-500 text-white' :
                                              'bg-yellow-500 text-black'}`}>
                                            {project.status}
                                        </span>
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <span className="font-[Sansita] px-3 py-1 rounded-full text-sm bg-white text-black border border-black">
                                            {project.category}
                                        </span>
                                    </div>
                                    {project.progress !== undefined && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-4 py-2">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-2 bg-gray-600 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-white rounded-full transition-all duration-500"
                                                        style={{ width: `${project.progress}%` }}
                                                    />
                                                </div>
                                                <span className="font-[Sansita] text-white text-xs">{project.progress}%</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h3 className="font-[SansitaBold] text-xl mb-2 line-clamp-1">{project.title}</h3>
                                    <p className="font-[Sansita] text-gray-600 text-sm mb-4 line-clamp-2">
                                        {project.subtitle}
                                    </p>
                                    {project.tech && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tech.slice(0, 3).map((t, i) => (
                                                <span key={i} className="font-[Sansita] text-xs px-2 py-1 bg-gray-100 rounded">
                                                    {t}
                                                </span>
                                            ))}
                                            {project.tech.length > 3 && (
                                                <span className="font-[Sansita] text-xs px-2 py-1 bg-gray-100 rounded">
                                                    +{project.tech.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                        {project.metrics ? (
                                            Object.entries(project.metrics).slice(0, 2).map(([key, value], i) => (
                                                <div key={i} className="text-center">
                                                    <p className="font-[SansitaBold] text-lg">{value}</p>
                                                    <p className="font-[Sansita] text-xs text-gray-500 capitalize">{key}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <>
                                                <div className="text-center">
                                                    <p className="font-[SansitaBold] text-sm">{project.budget || 'TBD'}</p>
                                                    <p className="font-[Sansita] text-xs text-gray-500">Budget</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="font-[SansitaBold] text-sm">{project.duration || 'TBD'}</p>
                                                    <p className="font-[Sansita] text-xs text-gray-500">Duration</p>
                                                </div>
                                            </>
                                        )}
                                    </div>
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