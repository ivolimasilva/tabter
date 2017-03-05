<template>
	<section class="hero is-light is-fullheight">
		<div class="hero-body">
			<div class="container has-text-centered">
				<h1 class="title is-1">Tabter</h1>
				<h2 class="subtitle is-3">An alternative to share and filter Google Sheets with a better experience in mind.</h2>
				<form class="control is-grouped" v-on:submit.prevent="onSubmit">
					<p class="control is-expanded">
						<input class="input is-large" type="text" placeholder="https://docs.google.com/spreadsheets/d/..." v-model="url">
						<span class="help is-danger" v-text="errorMsg"></span>
					</p>
					<p class="control">
						<button class="button is-primary is-large" v-bind:class="{ 'is-loading' : isProcessing }" type="submit">
							Go
						</button>
					</p>
				</form>
				<h3>Insert a <strong>public</strong> link for your document and <strong class="is-title">Tabter</strong> will displayed and
					provide the option to filter it.</h3>
				<h3>Here is an <a class="is-link" target="_blank" href="https://docs.google.com/spreadsheets/d/1kDqc3twQjie_sHaOAdH_tw9Dwu_DaYyXwLaYWfSEnNA/edit#gid=0">example</a> of a document and its <a class="is-link" class="is-title">Tabter</strong>.</h3>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		name: 'Home',
		data: function () {
			return {
				url: '',
				isProcessing: false,
				errorMsg: ''
			}
		},
		methods: {
			onSubmit: function () {
				this.isProcessing = true;

				if (this.url == '') {
					this.errorMsg = 'The URL is empty.';
					this.isProcessing = false;
					return false;
				}

				if (this.url.match(/https:\/\/docs\.google\.com\/spreadsheets\/d\/.*\/edit#gid=\d*/g)) {

					// Get the page ID
					var page_split = this.url.split('='),
						pageid = page_split[page_split.length - 1];

					// Get the sheet ID
					var sheet_split = this.url.split('/'),
						sheetid = sheet_split[sheet_split.length - 2];

					this.isProcessing = false;

					this.$router.push('/d/' + sheetid + '/' + pageid);
					return true;
				} else {
					this.errorMsg = 'The URL doesn\'t look valid.';
					this.isProcessing = false;
					return false;
				}
			}
		}
	}

</script>

<style>
	.is-fullheight {
		min-height: calc(100vh - 50px) !important;
	}
	
	.hero-body .container {
		margin-bottom: 25vh;
	}
	
	.is-title {
		color: #00D1B2 !important;
	}
	
	.is-link {
		text-decoration: underline;
	}
	
	.is-link:hover {
		color: #00D1B2 !important;
	}
</style>