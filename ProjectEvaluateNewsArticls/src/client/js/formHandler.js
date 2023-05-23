import { validUrl} from "./urlChecker";
/* funtion to post user input to server */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
       
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
       return newData;
    } catch (error) {
        console.log("error", error);
    }
};



function handleSubmit(event) {
    event.preventDefault()

    let formData = document.querySelector('#article_url').value;

    let checkUrl = validUrl(formData);
    if (checkUrl === 0) {
        window.alert('Please enter a URL!');
    } else if (checkUrl=== 1) {
        window.alert('This is not a valid URL!');
    } else {
        postData('http://localhost:8081/addDataAPI', { textUser: formData })
            .then(() => fetch("http://localhost:8081/return_data"))
            .then(res => res.json())
            .then(data => {
                console.log(data)
                updateUI(data)
            })
    }
};

/* update UI with new entry */
const updateUI = (res) => {
    document.querySelector('#agreement').innerHTML = "Agreement: " + res.agreement;
    document.querySelector('#confidence').innerHTML = "Confidence: " + res.confidence;
    document.querySelector('#irony').innerHTML = "Irony: " + res.irony;
    document.querySelector('#subjectivity').innerHTML = "Subjectivity: " + res.subjectivity;
    document.querySelector("#score_tag").innerHTML="score_tag: "+ res.score_tag;

};


export { handleSubmit };
