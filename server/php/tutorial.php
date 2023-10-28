<?php

// ! in empty php file for intellisense to create html barebones
    // Define function
    function sayHello() {
        echo "Hello!";
    }
    
    // Call function 
    sayHello();



    // Strings
    $name = "John"; 

    // Integers  
    $age = 25;

    // Floats
    $price = 19.99; 

    // Booleans
    $isMember = true;

    // Arrays
    $colors = ["red", "green", "blue"];


    // Simple function
    function sayHi() {
        echo "Hi!";
    }
    
    // Function with parameters
    function multiply($a, $b) {
        return $a * $b; 
    }

    // Loop Types

    // While loop
    while($i < 10) {
      echo $i;
      $i++; 
    }
    
    // For loop
    for($i = 0; $i < 10; $i++) {
      //...
    } 
    
    // Foreach 
    foreach($colors as $color) {
      echo $color; 
    }
    

    // Objects
    class User {
      public $name;
      public $age;
      
      public function __construct($name, $age) {
        $this->name = $name;
        $this->age = $age;
      }
    }
    
    $user1 = new User("John", 30);
    
    // Classes
    class Car {
      public $model;
      
      public function __construct($model) {
        $this->model = $model;
      }
      
      public function getModel() {
        return $this->model; 
      }
    }
    
    $car1 = new Car("BMW");
    echo $car1->getModel();


?>