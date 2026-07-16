import PropTypes from 'prop-types';

function ProjectMark({ project, className = '', textClass = 'text-2xl' }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={project.title}
        className={`object-cover bg-white ${className}`}
      />
    );
  }

  const initial = (project.title.replace(/[^A-Za-z0-9]/g, '').charAt(0) || '?').toUpperCase();

  return (
    <div className={`bg-black text-white flex items-center justify-center ${className}`}>
      <span className={`font-[Funnel] font-bold leading-none ${textClass}`}>{initial}</span>
    </div>
  );
}

ProjectMark.propTypes = {
  project: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
  textClass: PropTypes.string,
};

export default ProjectMark;
