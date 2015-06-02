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
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        //we first check that it is defined and then check that it has at least 1 item(its not empty)
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        //if it is defined then it can't be empty. with the for loop we make sure that this is the case for every object with a url
        function test_urls_defined(input) {
            it('has url', function() {
                expect(allFeeds[input].url).toBeDefined();
            });
        }

        for (var i = 0; i < allFeeds.length; i++) {
            test_urls_defined(i);
        }
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        //similar to the testing of urls
        function test_names_defined(input) {
            it('has name', function() {
                expect(allFeeds[input].name).toBeDefined();
            });
        }

        for (var i = 0; i < allFeeds.length; i++) {
            test_names_defined(i);
        }
    });
    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        //when the html is opened, the body element has a class of menu hidden (when the menu is open, the body has no class)
        it('menu element hidden', function() {
            expect(document.body.className).toBe('menu-hidden');
        });
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        //when we click the icon, we expect there to be no class for body. when we click the icon again we expect there to be no menu and body to have a class od menu hidden
        it('menu display when clicked, hide when clicked again', function() {
            $('.menu-icon-link').click();
            expect(document.body.className).toBe('');
            $('.menu-icon-link').click();
            expect(document.body.className).toBe('menu-hidden');
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function(){
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        //we check to make sure that the feed class has an array of children that is  > 0 (at least 1) in length
        beforeEach(function(done) {
            setTimeout(function() {
                done();
            }, 3000);
        });

        it('at least 1 .entry within the .feed container', function(done) {
                expect(document.getElementsByClassName('feed')[0].children.length > 0).toBe(true);
                done();
        });
    });
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        //from the previous example, we know that each url feed has at least 1 item. However, we cannot assume that there is more than 1 child per feed item.
        //hence we can only make sure that the first item is different in each of the feeds.
        var allFeeds0FirstEntryLink;
        var allFeeds1FirstEntryLink;

        beforeEach(function(done) {
            setTimeout(function() {
                loadFeed(0);
                allFeeds0FirstEntryLink = document.getElementsByClassName('feed')[0].children[0].href;
                done();
            }, 3000);
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