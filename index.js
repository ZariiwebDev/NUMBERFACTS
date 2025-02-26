const data = document.querySelector('#userNumber');
const result = document.getElementById('result');
const copyBtn = document.getElementById('copy');
const message = document.getElementById('message');
copyBtn.style.display = "none";
message.style.display = "none";
data.addEventListener('input',async(e)=>{
    function request(){
        result.style.color = "black";
            let number = Number(data.value);
            if(!isNaN(number) && data.value.length!==0){
                const REQUEST_URL = `http://numbersapi.com/${number}/math`;
                const METHOD = 'GET';
                const xhr = new XMLHttpRequest();
                xhr.open(METHOD,REQUEST_URL);
                xhr.onreadystatechange = async()=>{
                if(xhr.readyState === 4){
                    try{
                         const data = await xhr.responseText;
                         console.log(data)
                         data.includes('DOCTYPE') ? document.body.innerHTML = data : result.innerText = data;
                         copyToClipboard();
                    }catch(e){
                        console.log(e);
                    }
                }
                }
                xhr.send();
            }else{
                if(data.value.length!==0){
                    result.innerText = "Sorry Cannot Process your request!";
                    result.style.color = "red";
                }
                else
                result.innerText = "";
            }
    }    
    
    request();
});


function copyToClipboard(){
    copyBtn.style.display = "block";
    copyBtn.addEventListener('click',(e)=>{
            message.style.display = "block";
            setTimeout(()=>{message.style.display = "none"},2000);
            navigator.clipboard.writeText(result.textContent);
    });
}
