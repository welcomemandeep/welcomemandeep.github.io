	/*	Function: renderPieChart
    *	Variables:
    *		*	dataset: contains the input data for plotting the pie chart,
    *					input should be in the form of array of objects where each object should be like {label: , value: }
	*		*	dom_element_to_append_to : class name of the div element where the graph have to be appended
	*	Contains transitions and hover effects, load the css file 'css/pieChart.css' at the top of html page where the pie chart has to be loaded
	*/
	function renderPieChart (dataset,dom_element_to_append_to, colorScheme){

		var margin = {top:50,bottom:50,left:50,right:50};
		var width = 960 - margin.left - margin.right,
		height = width,
		radius = Math.min(width, height) / 2;
		dataset.forEach(function(item){
			item.enabled = true;
		});

		var color = d3.scale.linear().domain([0,350]).range(colorScheme)


		var svg = d3.select(dom_element_to_append_to)
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


        var pieGenerator = d3.layout.pie()
            .value(function(d) {return d.freq;})
            .sort(function(a, b) {
                return a.freq > b.origin ;
            });

// Create an arc generator with configuration
        var arcGenerator = d3.svg.arc()
            .innerRadius(100)
            .outerRadius(300);

        var arcData = pieGenerator(dataset);


        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
                return "<strong>Origin: </strong><span class='details'>" + d.data.origin + "<br></span>" +
                    "<strong>Frequency: </strong><span class='details'>" + d.data.freq +"<br></span>" ;
            })
        svg.call(tip);
// Create a path element and set its d attribute
        svg
            .selectAll('path')
            .data(arcData)
            .enter()
            .append('path')
            .attr('d', arcGenerator)
            .style("fill", function(d) { return color(d.data.freq); })
            .on('mouseover', function (d) {
                tip.show(d);

                d3.select(this)
                    .style("opacity", 1)
                    .style("stroke", "white")
                    .style("stroke-width", 3);
            })
            .on('mouseout', function (d) {
                tip.hide(d);

                d3.select(this)
                    .style("opacity", 0.8)
                    .style("stroke", "white")
                    .style("stroke-width", 0.3);
            });



	}