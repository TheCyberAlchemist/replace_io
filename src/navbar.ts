export {};
const nav = document.querySelector<HTMLDivElement>('#nav_div')!
const version_div = document.querySelector<HTMLDivElement>('.version_div')!
nav.innerHTML += `
<div class="w3-top">
	<div class="w3-bar w3-black w3-card" id="myNavbar">
	<div class="w3-bar-item w3-left w3-button">
		<a href="/">
		replace.io		
		</a>
	</div>

		<!-- Right-sided navbar links -->
		<div class="w3-right w3-hide-small">
			<a href="./about.html" class="w3-bar-item w3-button">ABOUT</a>
			<a href="./help.html" class="w3-bar-item w3-button">HELP</a>
			<a href="./add_pattern.html" class="w3-bar-item w3-button">ADD</a>
		</div>
		<!-- Hide right-floated links on small screens and replace them with a menu icon -->
	</div>
</div>
`

version_div.innerHTML = `
	replace.io (v0.9.2)
`;
