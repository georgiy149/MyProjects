### Simple Calculator

## How to run:

 ## 1) Install Python 3.
 ## 2) Open a terminal in this folder.
 ## 3) Run: `python rekenmachine.py`
 ## 4) Enter two numbers and an operator. Type `stop` to quit.


def bereken(getal1, getal2, bewerking):
    if bewerking == "+":
        return getal1 + getal2
    if bewerking == "-":
        return getal1 - getal2
    if bewerking == "*":
        return getal1 * getal2
    if bewerking == "/":
        if getal2 == 0:
            return "Kan niet delen door 0"
        return getal1 / getal2
    return "Onbekende bewerking. Gebruik +, -, * of /"


print("Eenvoudige rekenmachine")
print("Bewerkingen: +  -  *  /")
print("Typ 'stop' om te stoppen.\n")

while True:
    invoer = input("Eerste getal: ")
    if invoer.lower() == "stop":
        print("Tot ziens!")
        break

    try:
        getal1 = float(invoer)
        getal2 = float(input("Tweede getal: "))
        bewerking = input("Bewerking (+, -, *, /): ").strip()
        print("Uitkomst:", bereken(getal1, getal2, bewerking))
        print()
    except ValueError:
        print("Dat is geen geldig getal. Probeer opnieuw.\n")
