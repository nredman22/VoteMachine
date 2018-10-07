const app = angular.module("Candidate.App", []);

app.component("itmRoot", {
    controller: class {
        constructor() {
            this.candidates = [{ name: "Puppies", votes: 10, percentage: 0 }, { name: "Kittens", votes: 12, percentage: 0 }, { name: "Gerbils", votes: 7, percentage: 0  }];
            this.calculateVotePercentages();
            this.sortCandidates();
        }

        onVote(candidate) {
            console.log(`Vote for ${candidate.name}`);
            candidate.votes += 1;
            this.totalVotes += 1;
            this.calculateVotePercentages();
            this.sortCandidates();
        }


        onAddCandidate(candidate) {
            if(this.candidates.find( candidateA => candidateA.name.toLocaleLowerCase() === candidate.name.toLocaleLowerCase())){
                return;
            }
            console.log(`Added candidate ${candidate.name}`);
            candidate.votes = 0;
            candidate.percentage = 0;
            this.candidates.push(candidate);
        }

        onRemoveCandidate(candidate) {
            console.log(`Removed candidate ${candidate.name}`);
            let index = this.candidates.indexOf(candidate);
            if (index > -1) {
                this.candidates.splice(index, 1);
                this.calculateVotePercentages();
            }
        }

        calculateVotePercentages() {
            let totalVotes = 0;
            this.candidates.forEach((candidate) => {
                totalVotes += candidate.votes
            });
            this.candidates.forEach((candidate) => {
                console.log(totalVotes);
                candidate.percentage = Math.round((candidate.votes / totalVotes) * 100);
            });
        }

        sortCandidates() {
            this.candidates.sort(function(candidateA, candidateB) {
                return candidateB.votes - candidateA.votes});
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
                name: "",
            };
        }

        submitCandidate(candidate) {
            //if (candidate.name == null || candidate.name.length <= 0) return;
            this.onAdd({ $candidate: candidate });
            this.newCandidate = {};
        }

        removeCandidate(candidate) {
            this.onRemove({ $candidate: candidate });

        }
    },
    template: `
        <h2>Manage Candidates</h2>

        <h3>Add New Candidate</h3>
        <form name="candidatesubmit" ng-submit="$ctrl.submitCandidate($ctrl.newCandidate)" validate>

            <label>Candidate Name</label>
            <input type="text" name="candidatename" ng-model="$ctrl.newCandidate.name" required>
            <div role="alert">
            <!-- <span class="error" ng-show="candidatesubmit.candidatename.$error.required">Name is Required</span> -->
    </div>

            <button type="submit">Add</button>
        </form>

        <h3>Remove Candidate</h3>
        <ul>
            <li ng-repeat="candidate in $ctrl.candidates">
                <span ng-bind="::candidate.name"></span>
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
                <strong >{{candidate.percentage}}&percnt;</strong>
            </li>
        </ul>
    `
}); 
