const app = angular.module("Candidate.App", []);

app.component("itmRoot", {
    controller: class {
        constructor() {
            this.candidates = [{ name: "Puppies", votes: 10 }, { name: "Kittens", votes: 12 }, { name: "Gerbils", votes: 7 }];
            this.totalVotes = 29;
        }

        onVote(candidate) {
            candidate.votes += 1;
            this.totalVotes += 1;
        }


        onAddCandidate(candidate) {
            if(this.candidates.find( candidateA => candidateA.name.toLocaleLowerCase() === candidate.name.toLocaleLowerCase())){
                alert(`${candidate.name} is already in use!`);
                return;
            }
            this.candidates.push(candidate);
        }

        onRemoveCandidate(candidate) {
            let index = this.candidates.indexOf(candidate);
            if (index > -1) {
                this.totalVotes -= candidate.votes;
                this.candidates.splice(index, 1);  
            }
        }
    },
    template: `
        <div class="container">
            <div class="row justify-content-center" id="headline">
                <h1>Which candidate brings the most joy?</h1>
            </div>
        </div>

        <div class="container">       
            <itm-results 
                candidates="$ctrl.candidates"
                total-votes="$ctrl.totalVotes">
            </itm-results>
        </div>

        <div class="container">
            <itm-vote 
                candidates="$ctrl.candidates"
                on-vote="$ctrl.onVote($candidate)">
            </itm-vote>
        </div>

        <div class="container live-results">
            <itm-management 
                candidates="$ctrl.candidates"
                on-add="$ctrl.onAddCandidate($candidate)"
                on-remove="$ctrl.onRemoveCandidate($candidate)">
            </itm-management>
        </div>
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
                votes: 0
            };
        }

        submitCandidate(candidate) {
            //if (candidate.name == null || candidate.name.length <= 0) return;
            this.onAdd({ $candidate: candidate });
            this.newCandidate = {
                name: "",
                votes: 0
            }
        }

        removeCandidate(candidate) {
            this.onRemove({ $candidate: candidate });

        }
    },
    template: `
        <h2>Manage Candidates</h2>

        <h3>Add New Candidate</h3>
        <form ng-submit="$ctrl.submitCandidate($ctrl.newCandidate)" validate>
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
        candidates: "<",
        totalVotes: "<"
    },
    controller: class {

        calculatePercentage(vote) {
            return `${Math.round((vote/ this.totalVotes) * 100)}%`;
        }
    },
    template: `
        <h2>Live Results</h2>
        <div class="result" ng-repeat="candidate in $ctrl.candidates | orderBy : '-votes'">
            <div class="row">
                <div class="col-sm-4">
                    <h4 ng-bind="candidate.name"></h4>
                </div>
                <div class="col-sm-4 text-right">
                    <h4>{{$ctrl.calculatePercentage(candidate.votes)}}</h4>
                </div>
                <div class="col-sm-4 text-center">
                    <h4> {{candidate.votes}} votes</h4>
                </div>                
            </div>

            <div class="progress">
                <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="92" aria-valuemin="0" aria-valuemax="100" ng-style="{ width: $ctrl.calculatePercentage(candidate.votes) }">
            </div>
        </div>
    `
}); 
