
# PlanAhead Launch Script for Post PAR Floorplanning, created by Project Navigator

create_project -name multiplier -dir "C:/Users/Coert/Desktop/test/multiplier/planAhead_run_2" -part xc6slx9csg324-2
set srcset [get_property srcset [current_run -impl]]
set_property design_mode GateLvl $srcset
set_property edif_top_file "C:/Users/Coert/Desktop/test/multiplier/multiplier.ngc" [ get_property srcset [ current_run ] ]
add_files -norecurse { {C:/Users/Coert/Desktop/test/multiplier} }
set_property target_constrs_file "multiplier.ucf" [current_fileset -constrset]
add_files [list {multiplier.ucf}] -fileset [get_property constrset [current_run]]
link_design
read_xdl -file "C:/Users/Coert/Desktop/test/multiplier/multiplier.ncd"
if {[catch {read_twx -name results_1 -file "C:/Users/Coert/Desktop/test/multiplier/multiplier.twx"} eInfo]} {
   puts "WARNING: there was a problem importing \"C:/Users/Coert/Desktop/test/multiplier/multiplier.twx\": $eInfo"
}
