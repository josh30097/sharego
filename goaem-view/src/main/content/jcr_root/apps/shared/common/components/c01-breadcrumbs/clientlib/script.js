require('./styles.scss');

/**
 *
 *  C15 Breadcrumbs
 *
 *  Formats the breadcrumbs to prevent line breaks.
 */

Breadcrumbs = function(breadcrumbs) {
    //The crumb's ul parent element
    this.container = breadcrumbs[0];
    //Gets the padding inside the container so the effective container width is accurate
    var containerStyle = window.getComputedStyle(this.container);
    this.containerPadding =  parseInt(containerStyle.paddingLeft.replace("px","")) + parseInt(containerStyle.paddingRight.replace("px",""))
    
    //The list of li crumb elements
    this.crumbs = breadcrumbs.children("li");
    //Loop through all of the li crumb elements
    for(var i = 0; i < this.crumbs.length; i++) {
        //Save the displayed crumb width as an independent variable
        this.crumbs[i].width = this.crumbs[i].offsetWidth;
        //Hide the crumb if it's not the last.
        if(i != (this.crumbs.length - 1))
            this.crumbs[i].style.display = 'none';
    }

    //Create the ellipses element and set it's content
    this.ellipses = document.createElement('li');
    this.ellipses.textContent = "...";

    //Append the ellipses element to the DOM, save it's width, and hide it
    this.container.insertBefore(this.ellipses, this.crumbs[0]);
    this.ellipses.width = this.ellipses.offsetWidth;
    this.ellipses.style.display = 'none';

    this.refreshCrumbs();
};

Breadcrumbs.prototype.refreshCrumbs = function() {
    //If there are more than a single crumb
    if(this.crumbs.length > 1) {

        //Calculate the effective breadcrumb container width
        var containerWidth = this.container.clientWidth - this.containerPadding;
        //Hide all but the last crumb
        this.ellipses.style.display = 'none';
        for(var i = 0; i < this.crumbs.length - 1; i++) {
            this.crumbs[i].style.display = 'none';
        }

        //Instantiate total visible width with last crumb length
        var totalWidth = this.crumbs[this.crumbs.length - 1].width;
        //For each crumb but the last
        for(var i = this.crumbs.length - 2; i >= 0; i--) {
            //If current crumb width doesn't exceed the container width
            if((totalWidth + this.crumbs[i].width) < containerWidth) {
                //Add current crumb width to total visible width
                totalWidth += this.crumbs[i].width;
                //Make current crumb visible
                this.crumbs[i].style.display = 'block';
            } else {
                //Make ellipses visible
                this.ellipses.style.display = 'block';
                //If the ellipses width makes the total width exceed the container width
                if((totalWidth + this.ellipses.width) > containerWidth) {
                    //If there is a previously added intermediary crumb to hide then hide the crumb.
                    if(i < this.crumbs.length - 2)
                        this.crumbs[i + 1].style.display = 'none';
                }
                break;
            }
        }
    }
};

//The breadcrumb's crumb container element
var breadcrumbItems = $("ul.breadcrumbs");
//The breadcrumb's script object
var breadcrumbs;
//If the breadcrumb container exists
if(breadcrumbItems && breadcrumbItems.length > 0) {
    //Instantiate the breadcrumb object using the container element
    breadcrumbs = new Breadcrumbs(breadcrumbItems);
}

window.onresize = function(event) {
    //If the window has been resized and the breadcrumb exists then redetermine what crumbs to show
    if(breadcrumbs)
        breadcrumbs.refreshCrumbs();
};
