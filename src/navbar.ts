export {};
const nav = document.querySelector<HTMLDivElement>('#nav_div')!

nav.innerHTML += `
<div class="w3-top">
	<div class="w3-bar w3-black w3-card" id="myNavbar">
	<!--<a href="#home" class="w3-bar-item w3-button w3-wide"></a>
		 Right-sided navbar links -->
		<div class="w3-right w3-hide-small">
			<a href="./about.html" class="w3-bar-item w3-button">ABOUT</a>
			<a href="./help.html" class="w3-bar-item w3-button">HELP</a>
			<a href="/" class="w3-bar-item w3-button">HOME</a>
			<a href="./add_pattern.html" class="w3-bar-item w3-button">ADD</a>
		</div>
		<!-- Hide right-floated links on small screens and replace them with a menu icon -->
	</div>
</div>
`
