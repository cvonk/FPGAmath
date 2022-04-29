
# PlanAhead Launch Script for Post PAR Floorplanning, created by Project Navigator

create_project -name add -dir "C:/Users/Coert/Desktop/test/add/planAhead_run_2" -part xc6slx9csg324-2
set srcset [get_property srcset [current_run -impl]]
set_property design_mode GateLvl $srcset
set_property edif_top_file "C:/Users/Coert/Desktop/test/add/add.ngc" [ get_property srcset [ current_run ] ]
add_files -norecurse { {C:/Users/Coert/Desktop/test/add} }
set_property target_constrs_file "add.ucf" [current_fileset -constrset]
add_files [list {add.ucf}] -fileset [get_property constrset [current_run]]
link_design
read_xdl -file "C:/Users/Coert/Desktop/test/add/add.ncd"
if {[catch {read_twx -name results_1 -file "C:/Users/Coert/Desktop/test/add/add.twx"} eInfo]} {
   puts "WARNING: there was a problem importing \"C:/Users/Coert/Desktop/test/add/add.twx\": $eInfo"
}
