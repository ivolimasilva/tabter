<template>
	<div class="container is-fluid">

		<!-- Start filter -->
		<div class="columns">
			<div class="column" v-for="filter in filters">
				<label class="label">{{ filter }}</label>
				<span class="control">
					<span class="select">
						<select>
							<option v-for="option in options(filter)">{{ option }}</option>
						</select>
					</span>
				</span>
			</div>
		</div>
		<!-- End filter -->

		<!-- Start Table -->
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
		<!-- End Table -->
	</div>
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
				url: 'https://docs.google.com/spreadsheets/d/' + this.$route.params.id + '/edit#gid=0',
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
	
	.table th {
		text-align: center !important;
	}
	
	.table th .icon {
		font-size: small;
	}
	
	.table td {
		text-align: center !important;
		vertical-align: middle;
	}
	
	.table {
		margin: 2em 0em;
	}
	
	.control {
		width: 100% !important;
	}
	
	.control .select {
		width: 100% !important;
	}
	
	.control .select select {
		width: 100% !important;
	}
</style>