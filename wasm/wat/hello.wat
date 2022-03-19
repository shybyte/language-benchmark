(module
 (import "console" "log" (func $log (param i32)))
 (import "console" "time" (func $time))
 (import "console" "timeEnd" (func $timeEnd))
 (import "js" "mem" (memory 1))

;; (i32.store (i32.const 0) (i32.const 23)) 
;;     (i32.store (i32.const 4) (i32.const 42))

;;     (i32.const 8)
;;     (i32.load (i32.const 8))
;;     i32.const 1
;;     i32.add
;;     (i32.store)


;;     local.get $x
;;     local.get $x
;;     i32.mul
;;     call $timeEnd


  (func $blame (param $lines i32) (param $linesLength i32) (param $linesByAuthor i32) (result i32) 
    (local $linePtr i32)
    (local $author i32)
    (local $authorCount i32)
    (local $linesEnd i32)
    
    (local.set  $linesEnd (i32.add (local.get $linePtr) (i32.shl (local.get $linesLength) (i32.const 1))))
    
    (local.set $linePtr (local.get $lines)) 
    (loop $loop1
      
      
      (i32.store16 (local.get $linePtr) (i32.const 3)) 

      (br_if $loop1
        (i32.lt_s
          (local.tee $linePtr (i32.add (local.get $linePtr) (i32.const 2)))
          (local.get $linesEnd)))
    )
    
    
    call $time

    (local.set $linePtr (local.get $lines)) 
    local.get $linePtr
    call $log

      ;; (i32.store (local.get $linesByAuthor) (i32.const 22))   
      ;; (i32.store (local.get $linePtr) (i32.const 23))   

    
    (local.set $linePtr (local.get $lines)) 
    (loop $loop
      (i32.load16_u (local.get $linePtr))
      i32.const 4
      i32.mul
      local.tee $author
      i32.load
      i32.const 1
      i32.add
      local.set $authorCount

      (i32.store (local.get $author) (local.get $authorCount))
      (br_if $loop
        (i32.lt_s
          (local.tee $linePtr (i32.add (local.get $linePtr) (i32.const 2)))
          (local.get $linesEnd)))
    )


    ;; (i32.store (i32.const 0) (i32.const 23)) 
    ;; (i32.store (i32.const 4) (i32.const 42))

    ;; (i32.const 8)
    ;; (i32.load (i32.const 8))
    ;; i32.const 1
    ;; i32.add
    ;; (i32.store)


    ;; local.get $x
    ;; local.get $x
    ;; i32.mul
    i32.const 12
    call $timeEnd
  )

  (export "blame" (func $blame))
)
