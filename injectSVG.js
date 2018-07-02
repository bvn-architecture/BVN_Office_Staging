(function() {
    // function stripPath(svgDoc, selector) {
    //     let img = svgDoc.querySelector(selector);
    //     let oldPath = img.getAttribute("xlink:href");
    
    //     let newPath = oldPath.split("\\");
    //     newPath = newPath[newPath.length-1];
    //     img.setAttribute("xlink:href", newPath);
    // }

    let xhr = new XMLHttpRequest;
    xhr.open('get', 'numbertest.svg', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        let svg = xhr.responseXML.documentElement;

        // stripPath(svg, "defs image");
        // stripPath(svg, "#Background > image");

        let container = document.getElementById("svg_container");
        container.appendChild(svg);
    };
    xhr.send();
})();
