import re 
import json

abe_dict = {}
parsed_dict = {}

dict = open('words_alpha.txt', 'r+')
raw = dict.read().splitlines()
dict.close()

def replace(word): 
	word = re.sub('i|l', '1', word)
	word = re.sub('s', '5', word)
	word = re.sub('z', '2', word)
	word = re.sub('o', '0', word)
	return word

def replace_abe(word): 
	word = re.sub('A', '4', word)
	word = re.sub('B', '8', word)
	word = re.sub('E', '3', word)
	return word

for word in raw:
	if len(word) < 8 and len(word) > 2: 
		word = replace(word)
		if re.search('[g-z]', word) == None:
			parsed_dict[word.upper()] = len(word)

for word in parsed_dict:
	if re.search('A|B|E', word) != None:
		temp = replace_abe(word)
		abe_dict[temp.upper()] = len(temp)

parsed_dict.update(abe_dict)


file_path = r'parsed_dict.json'

with open(file_path, "w") as outfile:
	json.dump(parsed_dict, outfile)