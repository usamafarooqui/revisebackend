// kisi bhi field ko index denay se mongo ko sare doucments nahi dekhnay partay tou is se performance bhtr hoti hai 
// tour model mein ja k price ko index bnao is se sari price assending ya descending order mein ajayegi 
// phr agr search mein price ki query ho less than 1000 ya grater than thousand tou wo bus 1000 se start krega 
// na k hr doucments ko dekhay

// uper model ka sara kaam ajayega


// indexing prince here
// 1 yani ascending -1 yani descendinh
// tourSchema.index({price:1})
// compund indexing jis mein 2 ko index kr saken
tourSchema.index({price:1,ratingsAverage:-1});
tourSchema.index({slug:1});
