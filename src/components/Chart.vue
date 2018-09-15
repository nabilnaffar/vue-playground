<template>
    <div></div>
</template>

<script>
import * as d3 from "d3";

export default {
  props: ["nodes", "links"],
  data: function() {
    return {
      width: 600,
      height: 600,
      imgWidth: 18,
      imgHeight: 18,
      color: d3.scaleOrdinal(d3.schemeCategory10),
      images: d => `img/a${d.group}.png`,
      svg: undefined
    };
  },
  mounted: function() {
    this.svg = d3
      .select(this.$el)
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height);
  },
  methods: {
    draw: function() {
      // claening...
      this.svg.selectAll("*").remove();

      // -------- zoom -----------
      const zoomed = () => {
        this.svg.selectAll(".nodes").attr("transform", d3.event.transform);
        this.svg.selectAll(".links").attr("transform", d3.event.transform);
      };

      this.svg
        .append("g")
        .attr("class", "zoom")
        .append("rect")
        .attr("width", this.width)
        .attr("height", this.height)
        .style("fill", "none")
        .style("stroke", "#eee")
        .style("stroke-width", 4)
        .style("pointer-events", "all")
        .call(
          d3
            .zoom()
            .scaleExtent([1 / 2, 4])
            .on("zoom", zoomed)
        );
      //--------------------------

      const nodes = this.$props.nodes;
      const links = this.$props.links;

      const simulation = d3
        .forceSimulation()
        .force(
          "link",
          d3.forceLink().id(function(d) {
            return d.id;
          })
        )
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(this.width / 2, this.height / 2));

      const link = this.svg
        .append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .attr("stroke-width", function(d) {
          return Math.sqrt(d.value);
        });

      const node = this.svg
        .append("g")
        .attr("class", "nodes")
        .selectAll("image")
        .data(nodes)
        .enter()
        .append("svg:image")
        .attr("xlink:href", d => this.images(d))
        .attr("width", this.imgWidth)
        .attr("height", this.imgHeight)
        .call(
          d3
            .drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
        )
        .on("dblclick", node =>
          this.$store.dispatch("setSelectedPerson", { id: node.id })
        )
        .on("mouseover", node => this.$store.dispatch("setNode", { node }))
        .on("mouseleave", () => this.$store.dispatch("setNode", { node: {} }));

      node.append("title").text(function(d) {
        return d.id;
      });

      simulation.nodes(nodes).on("tick", ticked);

      simulation.force("link").links(links);

      function ticked() {
        link
          .attr("x1", function(d) {
            return d.source.x;
          })
          .attr("y1", function(d) {
            return d.source.y;
          })
          .attr("x2", function(d) {
            return d.target.x;
          })
          .attr("y2", function(d) {
            return d.target.y;
          });

        node.attr("x", d => d.x - 9).attr("y", d => d.y - 9);
      }

      function dragstarted(d) {
        d3.event.sourceEvent.stopPropagation();
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }

      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
    }
  },
  watch: {
    nodes: function() {
      this.draw();
    },
    links: function() {
      this.draw();
    }
  }
};
</script>

<style lang='scss'>
svg {
  margin: 25px;
  path {
    fill: none;
    stroke: #76bf8a;
    stroke-width: 3px;
  }
}

.links line {
  stroke: #999;
  stroke-opacity: 0.6;
}

.nodes circle {
  stroke: #fff;
  stroke-width: 1.5px;
}
</style>
