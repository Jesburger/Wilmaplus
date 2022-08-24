const InfoLink = "https://ruokalistat.espoocatering.fi/AromiStorageEspoo/blob/main/AromiMenusJsonData";
const Menulink = "https://ruokalistat.espoocatering.fi/AromiStorageEspoo/blob/menu/";

class Restaurantn{

    GetDays(){
        fetch(InfoLink)
        .then(response => response.json())
        .then(data => this.GetDaysFromData(data));
    };

    GetDaysFromData(d){
        if(typeof RestNum === 'number' && RestNum != NaN){
        fetch("https://" + d["Restaurants"][RestNum]["JMenus"][2]["LinkUrl"])
        .then(resp => resp.json())
        .then(data => this.SetMenu(data["Days"]));

        this.name = d["Restaurants"][RestNum]["Name"];
        }else{
            this.ChangeValues("");
        };
    };

    SetMenu(d){
        this.menu = [];
        if(typeof MealType === 'number' && MealType != NaN){
            d.forEach(e => {
                this.menu.push([e["WeekDay"],e["Meals"][MealType]["Name"]]);
            });
            this.ChangeValues(this.menu);
        }else{
            this.ChangeValues("");
        };
    };

    ChangeValues(a){
        let listBox = document.getElementsByClassName("empty-info")[0];
        let title = listBox.parentElement.getElementsByTagName("h1")[0];
        if(this.name != undefined){
            title.innerHTML="<b>Menu <p style=\"font-size: small;\">" + this.name + "</p></b>";
        }else{
            title.innerHTML="<b>Menu</b>";
        }
        title.setAttribute("style", "margin-left: 20px; margin-bottom: 0")
        listBox.setAttribute("style", "margin-left: 30px; margin-right: 30")
        listBox.innerHTML="";
        if(a.length != 0) {
            CreateList(a,listBox);
        }else{
            listBox.innerHTML="Ruokalistaa ei löytynyt! <br>Muokkaa lisäosan aseuksia!";
        }
    };
}

function CreateList(arr, obj){
    arr.forEach(e => {let o = document.createElement('li');
    o.setAttribute("style", "margin-bottom: 5px")
    b = document.createElement('b');
    b.innerHTML = e[0] + ": <br>" + e[1];    
    o.appendChild(b);
    obj.appendChild(o);
    });
};

async function main(){
    await browser.storage.local.get("Rest").then(e => RestNum = parseInt(e.Rest));
    console.log(RestNum);
    await browser.storage.local.get("Menu").then(e => MealType = paraseInt(e.Menu));
    console.log(MealType);
    r = new Restaurantn("rest");
    await r.GetDays();
}

main();

