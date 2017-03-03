<template>
	<section class="section table-component">

		<!-- Start filter -->
		<div class="container is-fluid">
			<div class="columns" v-if="filters.length > 0">
				<div class="column" v-for="filter in filters">
					<label class="label">{{ filter }}</label>
					<span class="is-fullwidth">
					<span class="select is-fullwidth">
						<select>
							<option v-for="option in options(filter)">{{ option }}</option>
						</select>
					</span>
					</span>
				</div>
			</div>
			<div class="has-text-centered" v-if="filters.length == 0">
				<h3 class="title is-5">You have no filters selected. Click on a <span class="icon"><i class="fa fa-search-plus"></i></span> to add a filter.</h3>
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
					<tr v-for="row in rows">
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
									if (label.length == 1) {
										resolve(result);
									} else {
										result.push(label);
									}
								});
								reject('Error parsing document.');
							});
						};

						// Trim labels to valid fields
						trimAlphabet(response.attributes.labels)
							.then(function (labels) {
								// Assign labels to document
								self.labels = labels;

								// Parse rows
								response.rows.forEach(function (row) {
									row.cellsArray.length = labels.length;
									self.rows.push(row.cellsArray);
								});
							});
					}
				}
			});
		},
		methods: {
			addFilter: function (label) {
				this.filters.indexOf(label) == -1 ? this.filters.push(label) : console.log('Filter already exists.');
			},
			removeFilter: function (label) {
				this.filters.indexOf(label) != -1 ? this.filters.splice(this.filters.indexOf(label), 1) : console.log('Filter doesn\'t exists.');
			},
			isFilter: function (label) {
				if (this.filters.indexOf(label) == -1) {
					return false;
				} else {
					return true;
				}
			},
			options: function (filter) {
				var options = [],
					index = this.labels.indexOf(filter);

				this.rows.forEach(function (row) {
					if (options.indexOf(row[index]) == -1) {
						options.push(row[index]);
					}
				});

				return options.sort();
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