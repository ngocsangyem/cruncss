import { slideToggle } from "../../../helpers/slideToggle";

const setAnimationItem = (element, elTop, elLeft, elWidth, elHeight) => {
	element.style.top = elTop + "px";
	element.style.left = elLeft + "px";
	element.style.width = elWidth + "px";
	element.style.height = elHeight + "px";
};

const navbarInit = () => {
	const navbarContainer = document.querySelector("#navbarSupportedContent");
	const navbarItem = navbarContainer.querySelectorAll(".nav-item");
	const navbarActiveItem = navbarContainer.querySelector(".nav-item.active");
	const navbarActiveItemPosTop = navbarActiveItem.offsetTop;
	const navbarActiveItemPosLeft = navbarActiveItem.offsetLeft;
	const navbarActiveItemWidth = navbarActiveItem.clientWidth;
	const navbarActiveItemHeight = navbarActiveItem.clientHeight;
	const animationItem = document.querySelector(".hori-selector");

	setAnimationItem(
		animationItem,
		navbarActiveItemPosTop,
		navbarActiveItemPosLeft,
		navbarActiveItemWidth,
		navbarActiveItemHeight
	);

	navbarItem.forEach(item => {
		item.addEventListener("click", function(event) {
			const target = event.target;
			item.classList.remove("active");
			this.classList.add("active");

			const targetPosTop = this.offsetTop;
			const targetPosLeft = this.offsetLeft;
			const targetWidth = this.clientWidth;
			const targetHeight = this.clientHeight;

			setAnimationItem(
				animationItem,
				targetPosTop,
				targetPosLeft,
				targetWidth,
				targetHeight
			);
		});
	});
};

const toggleNavbar = () => {
	const navbarButton = document.querySelector(".navbar-toggler");
	const navbar = document.querySelector(".navbar-collapse");

	navbarButton.addEventListener("click", () => {
		slideToggle(navbar);
		setTimeout(function() {
			navbarInit();
		});
	});
};

export { navbarInit, toggleNavbar };
