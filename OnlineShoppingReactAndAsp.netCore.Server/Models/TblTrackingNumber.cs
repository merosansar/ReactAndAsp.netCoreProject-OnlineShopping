﻿using System;
using System.Collections.Generic;

namespace OnlineShoppingReactAndAsp.netCore.Server.Models;

public partial class TblTrackingNumber
{
    public int Id { get; set; }

    public string Number { get; set; } = null!;

    public DateTime CreatedDate { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual ICollection<TblShipment> TblShipments { get; set; } = new List<TblShipment>();
}
