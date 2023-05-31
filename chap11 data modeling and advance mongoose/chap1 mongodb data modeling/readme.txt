-------------------types of relationship --------------------------------------------------- 

1:1
one movie will have one name

1:many iski sub types 

1:few (1 movie can will few awards)

1:many (1 movie can have thpusand of reviews )

1:ton (agr login mein console ho tou jitnay user ayengay wo data grow krega)

Many:many

1 movie can have many actors and 1 actor can play many in many movies


----------------------------references and embedding -------------------------------------------

Reference and normalize 
we keep the 2 related dataset completely seperated we use objectID is use to reference data in database this type of 
referncing is called child referencing 

--------------Type of referencing----------------------------------------------------
child referencing 
we keep record of related child document in parent document

parent referncing
each child keep a refernce to parent document (parent ko child k bare mein nahi pta hota)

two -way referencing 
Many:many 
movie actor ka aur actor movie ka reference apne pass rakhay ga







embedded / denormalize 
no seperate database 1 hi database mein sara data hoga 
advantage we can get all the data at one query 


--------------------------------------how to choose which technique to use --------------------------------------

always favour embedding on 1:few and 1:many unless there is a reason not to embedd 

1:ton or many:many use referencing

also always favour referencing when data is updated alot

use embedding when data is mostly read and when to dataset are closely belong to each other (username & email)

use two -way referencing in many:many

use child referencing for 1:many 

use parent referencing 1:ton 