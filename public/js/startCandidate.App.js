const app = angular.module("Candidate.App", []);

app.component("itmRoot", {
    controller: class {
        constructor() {
            this.candidates = [{ name: "Puppies", votes: 10 }, { name: "Kittens", votes: 12 }, { name: "Gerbils", votes: 7 }];
        }

        onVote(candidate) {
            console.log(`Vote for ${candidate.name}`);
        }

        onAddCandidate(candidate) {
            console.log(`Added candidate ${candidate.name}`);
        }

        onRemoveCandidate(candidate) {
            console.log(`Removed candidate ${candidate.name}`);
        }
    },
    template: `
        <h1>Which candidate brings the most joy?</h1>
             
        <itm-results 
            candidates="$ctrl.candidates">
        </itm-results>

        <itm-vote 
            candidates="$ctrl.candidates"
            on-vote="$ctrl.onVote($candidate)">
        </itm-vote>

        <itm-management 
            candidates="$ctrl.candidates"
            on-add="$ctrl.onAddCandidate($candidate)"
            on-remove="$ctrl.onRemoveCandidate($candidate)">
        </itm-management>
    `
});

app.component("itmManagement", {
    bindings: {
        candidates: "<",
        onAdd: "&",
        onRemove: "&"
    },
    controller: class {
        constructor() {
            this.newCandidate = {
                name: ""
            };
        }

        submitCandidate(candidate) {
            this.onAdd({ $candidate: candidate });
        }

        removeCandidate(candidate) {
            this.onRemove({ $candidate: candidate });
        }
    },
    template: `
        <h2>Manage Candidates</h2>

        <h3>Add New Candidate</h3>
        <form ng-submit="$ctrl.submitCandidate($ctrl.newCandidate)" novalidate>

            <label>Candidate Name</label>
            <input type="text" ng-model="$ctrl.newCandidate.name" required>

            <button type="submit">Add</button>
        </form>

        <h3>Remove Candidate</h3>
        <ul>
            <li ng-repeat="candidate in $ctrl.candidates">
                <span ng-bind="candidate.name"></span>
                <button type="button" ng-click="$ctrl.removeCandidate(candidate)">X</button>
            </li>
        </ul>

    `
});

app.component("itmVote", {
    bindings: {
        candidates: "<",
        onVote: "&"
    },
    controller: class {},
    template: `
        <h2>Cast your vote!</h2>

        <button type="button"
            ng-repeat="candidate in $ctrl.candidates"
            ng-click="$ctrl.onVote({ $candidate: candidate })">
            <span ng-bind="candidate.name"></span>
        </button>
    `
});

app.component("itmResults", {
    bindings: {
        candidates: "<"
    },
    controller: class {},
    template: `
        <h2>Live Results</h2>
        <ul>
            <li ng-repeat="candidate in $ctrl.candidates">
                <span ng-bind="candidate.name"></span>
                <strong ng-bind="candidate.votes"></strong>
            </li>
        </ul>
    `
});
