import PropTypes from 'prop-types';

export function SesionButton({buttonText, hoverText}) {
  return (
    <button className="overflow-hidden relative w-32 p-2 h-12 bg-black text-white border-none rounded-md text-xl font-bold cursor-pointer  z-10 group">
      <p className="text-sm">{buttonText}</p>
      <span className="absolute w-36 h-32 -top-8 -left-2 bg-sky-200 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-right"></span>
      <span className="absolute w-36 h-32 -top-8 -left-2 bg-sky-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-right"></span>
      <span className="absolute w-36 h-32 -top-8 -left-2 bg-sky-600 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-right"></span>
      <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10">
      <p className="text-sm my-1 ml-3">{hoverText}</p>
      </span>
    </button>
  );
}


SesionButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  hoverText: PropTypes.string.isRequired,
};