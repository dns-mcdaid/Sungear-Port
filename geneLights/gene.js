class Gene
{
	constructor(name, value)
	{
		this.name = name;
		this.value = value;
	}

	getName()
	{
		return this.name;
	}

	getValue()
	{
		return this.value;
	}

	/** 
     * compare two genes ascendingly according to their expression values
     */

    int compareTo(Gene otherGene)
    {
    	if(this.value < otherGene.value)
    	{
    		return -1;
    	} 
    	else if (this.value > otherGene.value)
    	{
    		return 1;
    	} 
    	else 
    	{
    		return 0;
    	}
    }
}