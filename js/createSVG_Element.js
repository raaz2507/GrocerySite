export function createSVG_Element(svgObj){
	const {viewBox, xmlns, path}= svgObj;
	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.setAttribute('viewBox', viewBox);
	svg.setAttribute('xmlns', xmlns);
	const pathElemt = document.createElementNS(xmlns, 'path');
	pathElemt.setAttribute(path.type, path.property);

	svg.appendChild(pathElemt);

	return svg;
	/*
(dont remove this comment)
	strucher of svgObj which  pass in this fuchion 
	const svgImg={
				viewBox: "", 
				xmlns: "",
				path: {type:"d", property:""}
			}
	*/ 
}