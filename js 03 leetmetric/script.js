// adding the DOM loader


// jab content load ho jayega tab is function ke andar jna hai 

document.addEventListener("DOMContentLoaded", function () {

    // fecth the all the required elements
    const searchButton = document.getElementById('btn');
    const userNameInput = document.getElementById('name');
    const statsContainer = document.querySelector('.stats');
    const progress = document.querySelector(".progress-item");
    const easyProgressCricle = document.querySelector(".easy");
    const mediumProgressCricle = document.querySelector(".medium ");
    const hardProgressCricle = document.querySelector(".hard ");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById('medium-label');
    const hardLabel = document.getElementById('hard-label');


    // card jo populate karna hai

    const cardStatsaConatainer = document.querySelector('.stats-containers');
    //---------------------------------------------------------------------------------------------------




    //----- step02-----check the username is validate or not
    function validateUsername(username) {
        if (username.trim() === "") {
            alert("username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z_]{3,16}$/;      // username only be: username,cool_guy
        const isMatching = regex.test(username);
        if (!isMatching) {
            alert("username is invalid");
        }
        return isMatching;
    }

    //----step03--- now we fetch the api 
    async function fetchUserDetails(username) {
        const URl = `https://leetcode-stats-api.herokuapp.com/${username}`;

        // async operation (network call) therefore, use try,
        try {
            searchButton.textContent = "searching..." // search btn show this content and disbled
            searchButton.disabled = true;

            const response = await fetch(URl); //---->> get request
            if (!response.ok) {
                throw new Error("unable to fetch the data")
            }
            const data = await response.json();
            console.log("loading data:", data);

            // now diaplay the data on ui

            displayUserData(data);



        }
        catch (error) {
            statsContainer.innerHTML = `<p> ${error.message}</p>`
        }
        finally {
            searchButton.textContent = "search"
            searchButton.disabled = false;
        }
    }

    // ---- step05-- now we set the progress circle (update)

    function updateProgress(solved, total, label, circle) {

        const progressDegree = (solved / total) * 100;

        circle.style.setProperty("--progress-degree", `${progressDegree}%`)
        label.textContent = `${solved}/${total}`;

    }

    ///-----(step-04)-------- fetch the question details


    function displayUserData(data) {
        const totalques = data.totalQuestions;
        const totaleasyques = data.totalEasy;
        const totalmediumques = data.totalMedium;
        const totalhardques = data.totalHard;

        const totalSolved = data.totalSolved;
        const easySolved = data.easySolved;
        const mediumSolved = data.mediumSolved;
        const hardSolved = data.hardSolved;
        const rank = data.ranking;
        const acceptanceRate = data.acceptanceRate;

        updateProgress(easySolved, totaleasyques, easyLabel, easyProgressCricle);

        updateProgress(mediumSolved, totalmediumques, mediumLabel, mediumProgressCricle);

        updateProgress(hardSolved, totalhardques, hardLabel, hardProgressCricle);

        console.log(rank)
        console.log(acceptanceRate)
        card(acceptanceRate)

    }



    //---> step 01---- add logic on search btn

    searchButton.addEventListener('click', function () {
        const username = userNameInput.value;
        console.log("loading id is :", username);
        if (validateUsername(username)) {
            fetchUserDetails(username)
        }
    })


    // last card dispaly in ui

    function card(acceptanceRate) {
        if (acceptanceRate < 30) {
            cardStatsaConatainer.innerHTML=` <div class="stats-container">
        
                                             <div class="card">
                                               <h2>-- Work a little harder --</h2>
                                               <p>acceptanceRate:${acceptanceRate}</p>
                                             </div>
                                             </div>`

        }
        else {
            cardStatsaConatainer.innerHTML=` <div class="stats-container">
        
            <div class="card">
              <h2>--It is better than before--</h2>
              <p>acceptanceRate:${acceptanceRate}</p>
            </div>
            </div>`
        }
    }



})

