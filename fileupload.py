import sys
import json
import requests

def read_file(file, keys):
    """Reads a json file and adds records to the API.
    
    - File must contain rows of json objects. 
    - Each json/record must contain these keys:
        - String 'difficulty'
        - String 'category'
        - String 'question'
        - String 'answer'
    - Additional helpful keys include:
        - String 'tournament'
        - String 'round' 
        - Number 'num' (question number)
        - Number 'year' (set number)
    """

    # format file
    prefix = "./files/"
    if file[:7] != prefix:
        file = prefix + file 

    # open and read file
    with open(file, "r") as f:
        lines = f.readlines()
        print(f"Pulling data from {file}")

        count = 0
        
        # limit amt for testing
        amt = 100
        lines = lines[:amt]

        for l in lines:
            line = json.loads(l)

            # extract data from json based on keys
            data = {}
            for k in keys:
                data[k] = line[k]
            # print(data)
            
            data["source"] = file

            # post to API
            r = requests.post('https://qb-api.onrender.com/api/questions', data=data)
            count += 1

        # json_dict = {}

        # extract specific details abt question

        # json_dict["level"] = line["difficulty"]
        # json_dict["category"] =  line["category"]
        # json_dict["question"] = line["question"]
        # json_dict["answer"] = line["answer"]
        # json_dict["source"] = file
        
        # json_dict["tournament"] = line["tournament"]
        # json_dict["round"] = line["round"]
        # json_dict["num"] = line["num"]
        # json_dict["year"] = line["year"]

        # print(json_dict)

        print(f"\n{count} records uploaded to API server.")
        return count == amt

def main():
    # check for correct usage
    if len(sys.argv) != 2:
        print("Error. Usage: python3 fileupload.py json_list.json")
        return 1
    elif sys.argv[1][-5:] != ".json":
        print("Error. Please upload a .json file")
        return 1
    # extract file from sys args
    file = sys.argv[1]

    # connect to the QB_API server hosted on Render
    print("\nAttempting to connect to API Render server. If it takes too long, rerun this file.\n")
    QB_API = requests.get('https://qb-api.onrender.com/api/questions')
    print(f"Status {QB_API.status_code}: API Render server Connected\n")

    # keys for data to extract on
    # 'source' already included
    keys = ["difficulty", "category", "question", "answer", "tournament", "round", "num", "year"]

    # read and extract keyed data from file and upload to API
    completed = read_file(file, keys)
    if not completed:
        print("Upload failed.")

if __name__ == "__main__":
    main()