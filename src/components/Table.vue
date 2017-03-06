<template>
	<section class="section table-component">

		<!-- Start filter -->
		<div class="container is-fluid">
			<div class="columns" v-if="activeFilters.length > 0">
				<div class="column" v-for="(filter, index) in activeFilters">
					<div class="label">
						<label class="label">{{ filter.key }}</label>
					</div>
					<span class="is-fullwidth">
						<span class="select is-fullwidth">
							<select v-model="activeFilters[index].value">
								<option v-for="option in options(filter)">{{ option }}</option>
							</select>
						</span>
					</span>
				</div>
			</div>
			<div class="has-text-centered" v-if="activeFilters.length == 0">
				<h3 class="title is-5"><span v-translate>You have no filters selected. Click on a </span><span class="icon"><i class="fa fa-search-plus"></i></span>
					<span v-translate> to add a filter.</span>
				</h3>
			</div>
			<hr>
		</div>
		<!-- End filter -->

		<!-- Start Table -->
		<div class="container is-fluid">
			<table class="table">
				<thead>
					<tr>
						<th v-for="label in labels" nowrap>
							{{ label }}
							<a v-if="!isFilter(label)" v-on:click="addFilter(label)">
								<span class="icon">
									<i class="fa fa-search-plus"></i>
								</span>
							</a>
							<a v-if="isFilter(label)" v-on:click="removeFilter(label)">
								<span class="icon">
									<i class="fa fa-search-minus"></i>
								</span>
							</a>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="row in filtered">
						<td v-for="field in row" v-text="field"></td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- End Table -->
	</section>
</template>

<script>
	export default {
		name: 'table',
		data: function () {
			return {
				labels: [],
				rows: [],
				filters: []
			}
		},
		mounted: function () {
			this.$translate.setLang(navigator.language || navigator.userLanguage);

			var self = this;

			sheetrock({
				url: 'https://docs.google.com/spreadsheets/d/' + this.$route.params.id + '/edit#gid=' + this.$route.params.page,
				query: 'select *',
				callback: function (err, options, response) {
					if (err) {
						console.error(err);
					} else {
                        /*
                         * Function to trim array of strings when found a single letter
                         *
                         * Params:
                         *  labels: Array - Array of string where the end of the array equals the alphabet
                         * 
                         * Returns:
                         *  result: Array - Array of string trimmed
                         * 
                         * TODO:
                         *  Refactor
                         */
						function trimAlphabet(labels) {
							return new Promise(function (resolve, reject) {
								var result = [];
								labels.forEach(function (label, index) {
									if (label.length <= 1) {
										resolve(result);
									} else {
										result.push(label);
									}
								});
								resolve(result);
							});
						};

						// Trim labels to valid fields
						trimAlphabet(response.attributes.labels)
							.then(function (labels) {
								// Assign labels to document
								self.labels = labels;

								labels.forEach(function (label) {
									self.filters.push({
										key: label,
										value: null,
										active: false
									})
								});

								// Parse rows
								response.rows.forEach(function (row) {
									if (JSON.stringify(row.cellsArray) != JSON.stringify(labels)) {
										row.cellsArray.length = labels.length;
										self.rows.push(row.cellsArray);
									}
								});
							});
					}
				}
			});
		},
		methods: {
			addFilter: function (label) {
				this.filters.forEach(function (filter) {
					if (filter.key === label) {
						filter.active = true;
					}
				});
			},
			removeFilter: function (label) {
				this.filters.forEach(function (filter) {
					if (filter.key === label) {
						filter.active = false;
					}
				});
			},
			isFilter: function (label) {
				var result = false;
				this.filters.forEach(function (filter) {
					if (filter.key == label && filter.active == true) {
						result = true;
					}
				});
				return result;
			},
			options: function (filter) {
				var options = [],
					index = this.filters.indexOf(filter);

				this.rows.forEach(function (row) {
					if (options.indexOf(row[index]) == -1) {
						options.push(row[index]);
					}
				});

				return options.sort();
			}
		},
		computed: {
			activeFilters: function () {
				return this.filters.filter(function (filter) {
					if (filter.active) {
						return true;
					} else {
						return false;
					}
				});
			},
			filtered: function () {
				var self = this;
				return this.rows.filter(function (row) {
					var flag = true;
					for (var i = 0; i < self.filters.length; i++) {
						if (self.filters[i].value != null && self.filters[i].active) {
							if (row[i] != self.filters[i].value) {
								flag = false;
							}
						}
					}
					return flag;
				});
			}
		},
		locales: {
			'pt-PT': {
				'You have no filters selected. Click on a ': 'Não tem qualquer filtro selecionado. Clique numa ',
				' to add a filter.': ' para adicionar um filtro.'
			}
		}
	}

</script>

<style>
	[v-cloak] {
		display: none;
	}

	@media screen and (min-width: 1000px) {
		.container.is-fluid {
			margin: 0 10em !important;
		}
	}



	.table th {
		text-align: center !important;
	}



	.table-component .icon {
		font-size: small;
	}



	.table td {
		text-align: center !important;
		vertical-align: middle;
	}
</style>