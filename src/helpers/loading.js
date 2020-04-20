const minLoaderIndex = 0;
const maxLoaderIndex = 5;
let currentLoaderIndex;
const loader = document.querySelector(".yem-loader");

const getLoaderClass = index => {
	return `yem-loader--${index}`;
};

const getLoaderIndex = () => {
	return Math.floor(Math.random() * (maxLoaderIndex - minLoaderIndex + 1));
};

const startProgess = () => {
	console.log("start progess");

	currentLoaderIndex = getLoaderIndex();
	loader.classList.remove("is-hidden");
	loader.classList.add(getLoaderClass(currentLoaderIndex));
};

const stopProgress = () => {
	console.log("stop progess");
	loader.classList.remove(getLoaderClass(currentLoaderIndex));
	loader.classList.add("is-hidden");
};

export { startProgess, stopProgress };
