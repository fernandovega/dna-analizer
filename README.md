# DNA Analizer

## Project setup

1. Edit the the .env file with your MySQL DB parameters.
2. Install all dependencies.

```
npm install
```

### Server

Execute the server:

```
npm start
```


### Endpoints

GET http://localhost:8080/mutation/

List of All dna's verified in the service

POST http://localhost:8080/mutation/

Create, verify and analyze DNA matrix

#### Input Payload

The input matrix(dna parameter) must be square and larger than 4x4, in the following example is a 7x7 matrix with mutation.

```
{
	"dna": [
		"ATGCGAT",
		"ATGCGAG",
		"CCGTTAA",
		"TTATGAG",
		"AGTTCAT",
		"CCCATGT",
		"TCACTGT"
	]
}
```


