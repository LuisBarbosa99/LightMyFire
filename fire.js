const pixelsArray = []
const pixelsWidth = 60	//largura do fogo
const pixelsHeight = 60	//altura do fogo
const fireColorsPalette = [
	{"r":7,"g":7,"b":7},
	{"r":31,"g":7,"b":7},
	{"r":47,"g":15,"b":7},
	{"r":71,"g":15,"b":7},
	{"r":87,"g":23,"b":7},
	{"r":103,"g":31,"b":7},
	{"r":119,"g":31,"b":7},
	{"r":143,"g":39,"b":7},
	{"r":159,"g":47,"b":7},
	{"r":175,"g":63,"b":7},
	{"r":191,"g":71,"b":7},
	{"r":199,"g":71,"b":7},
	{"r":223,"g":79,"b":7},
	{"r":223,"g":87,"b":7},
	{"r":223,"g":87,"b":7},
	{"r":215,"g":95,"b":7},
	{"r":215,"g":95,"b":7},
	{"r":215,"g":103,"b":15},
	{"r":207,"g":111,"b":15},
	{"r":207,"g":119,"b":15},
	{"r":207,"g":127,"b":15},
	{"r":207,"g":135,"b":23},
	{"r":199,"g":135,"b":23},
	{"r":199,"g":143,"b":23},
	{"r":199,"g":151,"b":31},
	{"r":191,"g":159,"b":31},
	{"r":191,"g":159,"b":31},
	{"r":191,"g":167,"b":39},
	{"r":191,"g":167,"b":39},
	{"r":191,"g":175,"b":47},
	{"r":183,"g":175,"b":47},
	{"r":183,"g":183,"b":47},
	{"r":183,"g":183,"b":55},
	{"r":207,"g":207,"b":111},
	{"r":223,"g":223,"b":159},
	{"r":239,"g":239,"b":199},
	{"r":255,"g":255,"b":255}
	]

function start(){
	createDataStructure()
	createFire()
	render()
	
	setInterval(calculatePropagation,50)
}
function createDataStructure(){
	const numberOfPixels = pixelsWidth * pixelsHeight
	
	for(let i = 0;i<numberOfPixels;i++){
		pixelsArray[i] = 0
	}
	
}
function calculatePropagation(){
	for (let column = 0;column<pixelsWidth;column++){
		for (let row = 0;row<pixelsHeight;row++){	
			const pixelIndex = column +(pixelsWidth * row)
			
			updateIntensity(pixelIndex)
		}
	}
	render()
}
function updateIntensity(currentPixelIndex){
	const belowPixelIndex = currentPixelIndex + pixelsWidth
	
	if (belowPixelIndex>= pixelsHeight * pixelsWidth){
		return
	} 
	const decay = Math.floor(Math.random() * 3)
	const belowPixelFireIntensity = pixelsArray[belowPixelIndex]
	const newFireIntensity  = belowPixelFireIntensity - decay >=  0 ? belowPixelFireIntensity - decay : 0

	pixelsArray[currentPixelIndex ] = newFireIntensity 
}
function render(){
	const debug = false
	
	let html  = '<table cellpadding = 0 cellspacing = 0>'
	
	for (let row = 0;row < pixelsHeight;row++){
		html += '<tr>'
		
		for (let column = 0; column<pixelsWidth;column++){
			const pixelIndex = column + (pixelsWidth * row)
			const fireIntensity = pixelsArray[pixelIndex]
			
			if(debug===true){
	
				html += '<td>'
				html += `<div class = "pixel-index">${pixelIndex}</div>`
				html += fireIntensity
				html += '</td>'				
				
			}else{
				const color = fireColorsPalette[fireIntensity]
				
				const colorString = `${color.r},${color.g},${color.b}`
				
				html += `<td class ="pixel" style = "background-color: rgb(${colorString})">`
				html += `</td>` 
			}
			

		}
		
		html +='</tr>'
	}
	
	html += '</table>'
	document.querySelector('#fireCanvas').innerHTML = html
}
function createFire(){
	for(let column = 0; column<=pixelsWidth ; column++){
		const overflowPixelIndex = pixelsWidth * pixelsHeight
		const pixelIndex = (overflowPixelIndex - pixelsWidth) + column
		
		pixelsArray[pixelIndex] = 36
	}
}
start()