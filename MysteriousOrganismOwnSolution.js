// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  }
  
  // Returns a random single stand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
  }
  
//Factory method:
  const pAequorFactory = (specimenNum, dna) => {
    return {
        specimenNum: specimenNum,
        dna: dna,
        mutate() { //function names mutate, to simulate the mutation of our organism.
            let randomIndex = Math.floor(Math.random() * this.dna.length); //Generate a random index to simulate the mutation
            let newDnaBase = returnRandBase();

//Loop that iterates throught the array of bases, and change the base at the index generated with randomIndex:
        while (this.dna[randomIndex] === newDnaBase){
            newDnaBase = returnRandBase();
        }
        this.dna[randomIndex] = newDnaBase;
        return this.dna;
        },
        compareDNA(newOrganism) {
            let dnaCount = 0;
            let printString = '';
            
            for (let i = 0; i < newOrganism.length; i++){
            if(this.dna[i] === newOrganism[i]){
                dnaCount++
            }    
            }
            dnaCount /= 15;
            dnaCount *= 100;
            printString = `Both specimens have ${dnaCount.toFixed(2)}% in common`;
            return printString;
        },
        willLikelySurvive() {
            let survCount = 0;

            for (let i = 0; i < this.dna.length; i++){
                if (this.dna[i] === 'C' || this.dna[i] === 'G'){
                    survCount++
                }
            }
            survCount /= 15;
            survCount *= 100;
            if (survCount >= 60) {
                return true;
            } else {
                return false;
            }
        },
        complementStrand() {
            let compStrand = [];

            for (let baseDna of this.dna){
                switch(baseDna){
                    case 'A':
                        compStrand.push('T')
                    break;
                    case 'T':
                        compStrand.push('A')
                    break;
                    case 'C':
                        compStrand.push('G')
                        break;
                    case 'G':
                        compStrand.push('C')
                        break;
                }
            }
            return compStrand;
        }
    }
  };

  let organismArray = [];
  let specimenNumID = 1;

  while (organismArray.length < 30){
    let survOrganisms = pAequorFactory(specimenNumID, mockUpStrand());
    specimenNumID++;
    if(survOrganisms.willLikelySurvive()){
    organismArray.push(survOrganisms);
    }
  }

  const organismSpecTest = pAequorFactory(276, mockUpStrand());
  console.log(organismSpecTest);
  console.log(organismSpecTest.mutate());
  console.log(organismSpecTest.compareDNA(mockUpStrand()));
  console.log(organismSpecTest.willLikelySurvive());
  console.log(organismArray);
  console.log(organismSpecTest.complementStrand());