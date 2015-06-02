/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        //we first check that it is defined and then check that it has at least 1 item(its not empty)
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //testing that it it defined and not empty. with the for loop we make sure that this is the case for every object with a url
        function test_urls_defined(input) {
            it('has url', function() {
                expect(allFeeds[input].url).toBeDefined();
                expect(allFeeds[input].url.length).not.toBe(0);
            });
        }

        for (var i = 0; i < allFeeds.length; i++) {
            test_urls_defined(i);
        }

        //similar to the testing of urls except testing that the urls are defined and not empty
        function test_names_defined(input) {
            it('has name', function() {
                expect(allFeeds[input].name).toBeDefined();
                expect(allFeeds[input].name.length).not.toBe(0);
            });
        }

        for (var i = 0; i < allFeeds.length; i++) {
            test_names_defined(i);
        }
    });

    describe('The menu', function() {
        //when the html is opened, the body element has a class of menu hidden (when the menu is open, the body has no class)
        it('menu element hidden', function() {
            expect(document.body.className).toBe('menu-hidden');
        });
        //when we click the icon, we expect there to be no class for body. when we click the icon again we expect there to be no menu and body to have a class od menu hidden
        it('menu display when clicked, hide when clicked again', function() {
            $('.menu-icon-link').click();
            expect(document.body.className).toBe('');
            $('.menu-icon-link').click();
            expect(document.body.className).toBe('menu-hidden');
        });
    });

    describe('Initial Entries', function() {
        //we check to make sure that the feed class has an array of children that is  > 0 (at least 1) in length
        beforeEach(function (done){
            loadFeed(0, function(){
                done();
            });
        });

        it('at least 1 .entry within the .feed container', function(done) {
            expect(document.getElementsByClassName('feed')[0].children.length > 0).toBe(true);
            done();
        });
    });

    describe('New Feed Selection', function() {
        //from the previous example, we know that each url feed has at least 1 item. However, we cannot assume that there is more than 1 child per feed item.
        //hence we can only make sure that the first item is different in each of the feeds.
        var allFeeds0FirstEntryLink;
        var allFeeds1FirstEntryLink;

        beforeEach(function(done) {
            loadFeed(0, function(){
                allFeeds0FirstEntryLink = document.getElementsByClassName('feed')[0].children[0].href;
                done();
            });
        });

        it('the content actually changes', function(done) {
            loadFeed(1, function() {
                allFeeds1FirstEntryLink = document.getElementsByClassName('feed')[0].children[0].href;
                expect(allFeeds0FirstEntryLink).not.toBe(allFeeds1FirstEntryLink);
                done();
            });
        });
    });
}());