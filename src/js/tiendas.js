import { stores } from "./stores/index.js"
(async () => {
	await addNiceSelect()
	if (storesJsonFile) {
		stores.get(storesJsonFile).then(({ciudades}) => {
			const desktopMenu = document.querySelector('.cities-menu'),
				mobileMenu = document.querySelector('.cities-menu--mobile'),
				storesContainer = document.querySelector("#stores"),
				storesPromises = []

			Object.entries(ciudades).forEach(cityData => {
				const city = cityData[1], label = cityData[0]
				desktopMenu.insertAdjacentHTML('beforeend', `<li role="presentation">
						<a href="#${label}" aria-controls="${label}" role="tab" data-toggle="tab">${city.label}</a>
					</li>`)
				let option = new Option(city.label, label)
				mobileMenu.append(option)
				Object.values(city.tiendas).forEach(store => {
					storesPromises.push(stores.render.store({
						address: store.direccion,
						city: city.label,
						howToGet: store.como_llegar,
						label: `todas ${label}`,
						link: store.ir,
						external: store.externo,
						name: store.nombre_tienda,
						schedule: store.horario_apertura
					}))
				})
			})
			Promise.all(storesPromises).then(async storesHtml => {
				storesContainer.innerHTML = ""
				storesHtml.forEach(storeHtml => storesContainer.insertAdjacentHTML('beforeend', `${storeHtml}`))
				document.querySelectorAll('.cities-menu > li > a').forEach(menu => {
					menu.addEventListener('click', e => {
						e.preventDefault()
						document.querySelector('.cities-menu > li.active').classList.remove('active')
						e.currentTarget.closest('li').classList.add('active')
						const optionValue = menu.getAttribute('href').replace('#', '')
						if (optionValue) {
							document.querySelectorAll(`.store:not([data-city~=${optionValue}])`).forEach(storeElement => storeElement.style.display = 'none')
							document.querySelectorAll(`.store[data-city~=${optionValue}]`).forEach(storeElement => storeElement.style.display = 'grid')
						} else {
							document.querySelectorAll('.store').forEach(storeElement => storeElement.style.display = 'none')
						}
					})
				})
				$('document').ready(function(){
					$('.cities-menu--mobile').niceSelect().change(function () {
						$(this).find("option:selected").each(function () {
							const optionValue = $(this).attr("value")
							if (optionValue) {
								$(".store").not("[data-city~=" + optionValue + "]").hide()
								$("[data-city~=" + optionValue + "]").css({ 'display': 'grid' })
							} else {
								$(".store").hide()
							}
						})
					})
				})
			})
		})
	}

	async function addNiceSelect() {
		const s = document.createElement("script")
		s.type = "text/javascript"
		s.src = "https://cdn.jsdelivr.net/gh/ux-alkosto/stores@latest/dist/common/js/jquery.nice-select.js"
		s.crossorigin = "anonymus"
		document.getElementsByTagName('head')[0].appendChild(s)
	}
})();